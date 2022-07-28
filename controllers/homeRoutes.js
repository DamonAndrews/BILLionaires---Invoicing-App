const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// TODO: Add a comment describing the functionality of the withAuth middleware
//find all the user values but exclude password
//applies middleware of withAuth to this route
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      // TODO: Add a comment describing the functionality of this property
      //on homepage while logged in youll be prompted to login or logout depending on your state
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // TODO: Add a comment describing the functionality of this if statement
  //if they hit login url while logged in this takes them to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;