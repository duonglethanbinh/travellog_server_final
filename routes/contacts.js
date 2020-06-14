const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const Contact = require('../models/contacts');

router.get('/', async (req, res) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (err) {
    res.json({message: err});
  }
});

router.post('/', async (req, res) => {
  const contact = new Contact(
      {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      },
  );
  try {
    const saveContact = await contact.save();
    res.json(saveContact);
  } catch (err) {
    res.json({message: err});
  }
});

router.patch('/:updateid', async (req, res) => {
  try {
    const updateContact = await Contact.updateOne(
        {_id: req.params.updateid},
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
          },
        },
    );

    res.json(updateContact);
  } catch (err) {
    res.json({message: err});
  }
});

module.exports = router;
