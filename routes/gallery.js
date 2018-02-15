


const express = require('express');
const router = express.Router();
const Gallery = require('../knex/models/Gallery');

const {isAuthenticated: auth} = require('./helper');

router.get('/new', auth, (req, res) => {
  return res.render('galleryNew');
})

router.route('/')
.post(auth, (req, res) => {
  let {author, link, description} = req.body;
  let user_id = req.user.id;
  return new Gallery({
    author,
    link,
    description,
    user_id
  })
  .save()
  .then(result => {
    //return res.json(result)
    //console.log('POOOOOOOOOOOSSTED')
    return res.redirect('/gallery');
  })
  .catch(err => {
    console.log('caaaatch')
    return res.redirect('/gallery')
    //return res.json({message: err.message});
  })
})
.get( (req, res) => {
  return Gallery.fetchAll()
  .then(request => {
    //let locals = request.toJSON();
    let locals = {
      collection: request.toJSON()
    }
    locals.user = req.user;
    
    return res.render('index', locals);
    //return res.render('index', {collection: request.toJSON()})
    //return res.json(request)
  })
  .catch(err => {
    return res.json({message: err.message});
  })
})

router.get('/:id/edit', auth, (req, res) => {
  return new Gallery()
  .where({id: req.params.id})
  .fetch()
  .then(request => {
    if(!request){
      throw new Error('not found')
    }
    return res.render('galleryEdit', request.toJSON())
  })
  .catch(err =>{
    return res.json({message: err.message})
  })
})

router.get('/:id',(req, res) => {
  return new Gallery()
  .where({id: req.params.id})
  .fetch()
  .then(request => {
    if(!request){
      throw new Error('not found');
    }
    let locals = request.toJSON();
    console.log('reqUUUUSER' + req.user)
    locals.user = req.user
    console.log('loooooocals' + locals)
    return res.render('gallery', locals)
    //return res.json(request);
  })
  .catch(err => {
    return res.json({message: err.message});
  })
})

router.put('/:id' , auth, (req, res) => {
  console.log(req.body.id)
  return new Gallery({id: req.params.id})
  .save(req.body, {
    patch:true,
    require:true
  })
  .then(request => {
    if(!request){
      throw new Error('not found');
    }
    //return res.json(request);
    return res.redirect(`/gallery`);
  })
  .catch(err => {
    return res.json({message: err.message})
  })
})

router.delete('/:id', auth, (req, res) => {
  return new Gallery({id: req.params.id})
  .destroy()
  .then(request => {
    if(!request){
      throw new Error('not found')
    }
    //res.json(request)
    res.redirect('/gallery');
  })
  .catch(err => {
    return res.json({message: err.message})
  })
})





module.exports = router