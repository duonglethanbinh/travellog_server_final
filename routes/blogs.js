const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Blogs = require('../models/blogs');

// Get all data
router.get('/', async (req, res) => {
  try {
    const blogs = await Blogs.find().sort({created: -1});
    res.json(blogs);
  } catch (err) {
    res.json({message: err});
  }
});
// Search by ID
router.get('/:blogsId', (req, res) => {
  const id = req.params.blogsId;
  console.log(id);
  Blogs.find({$or: [{name: id}]}).sort({created: -1})
      .exec()
      .then((doc) => {
        if (doc.length > 0) {
          console.log(doc.length);
          res.status(200).json(doc);
        } else {
          res.json({message: 'Not found'});
        }
      })
      .catch((err) => res.json({message: err}));
});
// Search single data
router.get('/:searchId/data', (req, res, next) => {
  const id = req.params.searchId;
  console.log(id);
  Blogs.findById(id)
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => res.json({message: err}));
});

// Add new document
router.post('/', async (req, res) => {
  const blogs = new Blogs(
      {
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
      },
  );
  try {
    const saveBlogs = await blogs.save();
    res.json(saveBlogs);
  } catch (err) {
    res.json({message: err});
  }
});
// Update document
router.patch('/:updateid', async (req, res) => {
  try {
    await Blogs.updateOne({_id: req.params.updateid},
        {
          $set: {
            name: req.body.name,
            title: req.body.title,
            content: req.body.content,
            created: req.body.created,
          },
        },
    );

    res.json({message: 'blog updated'});
  } catch (err) {
    res.json({message: err});
  }
});

// Delete document
router.delete('/:deleteid', async (req, res) => {
  try {
    console.log(req.params);
    await Blogs.deleteOne({_id: req.params.deleteid});
    res.json({message: 'blog deleted'});
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;
