const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const authMid = require('../middlewares/auth');

// @route    GET api/contacts
// @desc     Get all user contacts
// @access   Private
router.get('/', authMid, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route    POST api/contacts
// @desc     Add new contact
// @access   Private
router.post(
  '/',
  [
    authMid,
    [
      check('name').notEmpty(),
      check('email').isEmail(),
      check('phone').notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array().map((err) => err) });
    }
    const { name, email, phone, type } = req.body;
    const user = req.user.id;

    try {
      let contact = new Contact({
        name,
        email,
        phone,
        type,
        user,
      });
      const json = await contact.save();
      res.json(json);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    PUT api/contacts/:id
// @desc     Update contact
// @access   Private
router.put('/:id', authMid, async (req, res) => {
  const { name, email, phone, type } = req.body;
  const userId = req.user.id;
  const contactId = req.params.id;

  let updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (phone) updateFields.phone = phone;
  if (type) updateFields.type = type;

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    if (userId !== contact.user.toString()) {
      return res.status(401).send('Access denied');
    }

    const newContact = await Contact.findByIdAndUpdate(
      contactId,
      { $set: updateFields },
      {
        new: true,
      }
    );
    res.json(newContact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/contacts/:id
// @desc     Delete contact
// @access   Private
router.delete('/:id', authMid, async (req, res) => {
  const contactId = req.params.id;
  const userId = req.user.id;

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    if (contact.user.toString() !== userId) {
      return res.status(401).send('Access denied');
    }

    await Contact.findByIdAndDelete(contactId);
    res.json({msg: 'Delete success'});
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
