const router = require('express').Router();
const { Gallery, Photo } = require('../models');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findAll({
      include: [
        {
          model: Photo,
          attributes: ['filename', 'description']
        }
      ]
    });

    const Galleries= dbGalleryData.map(Gallery =>
      Gallery.get({ plain: true })
    );
    // TODO: Add a comment describing how we pass the session to the view
    res.render('homepage', {
      Galleries,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Gallery
router.get('/Gallery/:id', async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Photo,
          attributes: [
            'id',
            'title',
            'artist',
            'exhibition_date',
            'filename',
            'description'
          ]
        }
      ]
    });

    const Gallery = dbGalleryData.get({ plain: true });
    // TODO: Add a comment describing how we pass the session to the Gallery view.
    res.render('Gallery', { Gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Photo
router.get('/Photo/:id', async (req, res) => {
  try {
    const dbPhotoData = await Photo.findByPk(req.params.id);

    const Photo = dbPhotoData.get({ plain: true });
    // TODO: Add a comment describing how we pass the session to the Photo view.
    res.render('Photo', { Photo, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;
