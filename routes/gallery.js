
const express = require('express');
const router = express.Router();
const Gallery = require('../knex/models/Gallery')


router.get('/new', (req, res) => {
  return res.render('galleryNew')
})

router.route('/')
.post((req, res) => {
  let {author, link, description} = req.body;
  return new Gallery({
    author,
    link,
    description
  })
  .save()
  .then(result => {
    //return res.json(result)
    return res.redirect('/gallery');
  })
  .catch(err => {
    return res.json({message: err.message});
  })
})
.get((req, res) => {
  return Gallery.fetchAll()
  .then(request => {
    return res.render('index', {collection: request.toJSON()})
    //return res.json(request)
  })
  .catch(err => {
    return res.json({message: err.message});
  })
})

router.get('/:id/edit', (req, res) => {
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

router.get('/:id', (req, res) => {
  return new Gallery()
  .where({id: req.params.id})
  .fetch()
  .then(request => {
    if(!request){
      throw new Error('not found');
    }
    return res.render('gallery', request.toJSON())
    //return res.json(request);
  })
  .catch(err => {
    return res.json({message: err.message});
  })
})

router.put('/:id' ,(req, res) => {
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
    return res.redirect(`/gallery${id}`);
  })
  .catch(err => {
    return res.json({message: err.message})
  })
})

router.delete('/:id', (req, res) => {
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