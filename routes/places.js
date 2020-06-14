const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Places = require('../models/places');

// get all data
router.get('/', async (req, res) => {
  try {
    const place = await Places.find();
    res.json(place);
  } catch (err) {
    res.json({message: err});
  }
});

// get single data
router.get('/:searchId/data', (req, res, next) => {
  const id = req.params.searchId;
  console.log(id);
  Places.findById(id)
      .exec()
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => res.json({message: err}));
});

// add new data
router.post('/', async (req, res) => {
  const place = new Places(
      {
        name: req.body.name,
        image: req.body.image,
      },
  );
  try {
    const savePlace = await place.save();
    res.json(savePlace);
  } catch (err) {
    res.json({message: err});
  }
});

// Update data
router.patch('/:updateid', async (req, res) => {
  try {
    await Places.updateOne(
        {_id: req.params.updateid},
        {
          $set: {
            name: req.body.name,
            image: req.body.image,
          },
        },
    );
    res.json({message: 'place updated'});
  } catch (err) {
    res.json({message: err});
  }
});

// delete data
router.delete('/:deleteid', async (req, res) => {
  try {
    await Places.deleteOne({_id: req.params.deleteid});
    res.json({message: 'place deleted'});
  } catch (err) {
    res.json({message: err});
  }
});
module.exports = router;
