const router = require('express').Router();
const { Gallery, Photo } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findAll({
      include: [
        {
          model: Photo,
          attributes: ['filename', 'description'],
        },
      ],
    });

    console.log('LOOK HERE: ', dbGalleryData)
    const galleries = dbGalleryData.map((gallery) => {
      return gallery.get({ plain: true })
    }
    );
      console.log('galleries: ', galleries )
    res.render('homepage', {
      galleries,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
// Use the custom middleware before allowing the user to access the gallery
router.get('/gallery/:id', withAuth, async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Photo,
          attributes: [
            'id',
            'title',
            // 'artist',
            // 'exhibition_date',
            'filename',
            'description',
          ],
        },
      ],
    });

    const gallery = dbGalleryData.get({ plain: true });
    console.log(gallery)
    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one photo
// Use the custom middleware before allowing the user to access the photo
router.get('/photo/:id', withAuth, async (req, res) => {
  try {
    const dbPhotoData = await Photo.findByPk(req.params.id);

    const photo = dbPhotoData.get({ plain: true });

    res.render('photo', { photo, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});


module.exports = router;