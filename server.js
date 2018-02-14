//MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const galleryRoutes = require('./routes/gallery');
const userRoutes = require('./routes/users');
const methodOverride = require('method-override');

const {isAuthenticated: auth} = require('./routes/helper');

//AUTHENTICATION MODULES
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const Redis = require('connect-redis')(session)
const bcrypt = require('bcrypt');
const User = require('./knex/models/User');

//CONSTANTS
const PORT = process.env.PORT || 3000;
const saltRounds = 12;

//APPLICATIONS
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//PASSPORT
app.use(session({
  store: new Redis(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public')));

app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

// app.get('/register', (req, res) => {
//   return res.render('register');
// })

passport.serializeUser((user, done) => {
  console.log('serializing');
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user,done) => {
  console.log('deserializing');
  new User({ id: user.id}).fetch()
  .then(user => {
    user = user.toJSON();
    return done(null, {
      id: user.id,
      username: user.username
    });
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  return new User({ username: username }).fetch()
  .then ( user => {
    user = user.toJSON();
    //console.log(user)
    if (user === null) {
      return done(null, false, {message: 'bad username or password'});
    }
    else {
      //console.log(password, user.password);
      bcrypt.compare(password, user.password)
      .then(res => {
        //console.log('brcrypt: ' + res)
        if (res) { return done(null, user); }
        else {
          return done(null, false, {message: 'bad username or password'});
        }
      });
    }
  })
  .catch(err => { console.log('error: ', err); });
}));

app.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/user/login'
}));

app.get('/logout', (req, res) => {
  req.logout();
  //res.sendStatus(200);
  return res.redirect('/gallery');
});

app.post('/register', (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) { console.log(err); }
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      if (err) { console.log(err); }
      new User({
        username: req.body.username,
        password: hash
      })
      .save()
      .then((user) => {
        return res.redirect('/gallery');
      })
      .catch((err) => { console.log(err); return res.send('Stupid username'); });
    });
  });
});

// app.get('/', (req,res) => {
//   res.send('register success')
// })

// URL: localhost:3000/gallery
app.use('/gallery', galleryRoutes);
app.use('/user', userRoutes);

// function isAuthenticated (req, res, next) {
//   if(req.isAuthenticated()) { 
//     //console.log( req.user)
//     next();
//   }
//   else { res.redirect('/'); }
// }

app.get('/secret', auth, (req, res) => {
  console.log('secret: ' + req)
  console.log('req.user: ', req.user);
  console.log('req.user id', req.user.id);
  console.log('req.username', req.user.username);
  res.send('you found the secret!');
});




















app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`)
})