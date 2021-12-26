const express = require('express');
const bcryptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();

// @route    POST api/users
// @desc     Register an user
// @access   Public
router.post(
  '/',
  [
    check('name', 'name is required').notEmpty(),
    check('email', 'email is invalid').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already registered!' });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  }
);

module.exports = router;
