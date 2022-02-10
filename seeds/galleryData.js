const { Gallery } = require('../models');

const Gallerydata = [
  {
    name: 'Cali',
    filename: 'cali1.jpg',
    ending_date: 'June 21, 2021 17:00:00',
  },
  {
    name: 'Kylie',
    filename: 'k1.jpg',
    ending_date: 'September 22, 2021 22:00:00',
  },
  {
    name: 'Destiny',
    filename: 'd7.jpg',
    ending_date: 'December 21, 2021 20:30:00',
  },
  {
    name: 'DOU',
    filename: 'duo11.jpg',
    ending_date: 'March 19, 2021 19:00:00',
  },
];

const seedGallery = () => Gallery.bulkCreate(Gallerydata);

module.exports = seedGallery;
