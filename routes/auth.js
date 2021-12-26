const express = require('express');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const authMid = require('../middlewares/auth');
const router = express.Router();

// @route    GET api/auth
// @desc     Logged in user
// @access   Private
router.get('/', authMid, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -_id -__v');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// @route    POST api/auth
// @desc     Auth user + get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').notEmpty(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) {
            return res.json({ err });
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error });
    }
  }
);

module.exports = router;
