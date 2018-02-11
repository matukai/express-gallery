//MODULES
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const galleryRoutes = require('./routes/gallery');
const methodOverride = require('method-override');


//CONSTANTS
const PORT = process.env.PORT || 3000;

//APPLICATIONS
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// URL: localhost:3000/gallery
app.use('/gallery', galleryRoutes);

app.use(express.static(path.join(__dirname, '/public')));

app.engine('.hbs', handlebars({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');



// app.get('/', (req, res) => {
//   res.render('./layouts/main')
// })




app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`)
})