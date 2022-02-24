const User = require('./user');
const Gallery = require('./gallery');
const Photo = require('./photo');

Gallery.hasMany(Photo, {
  foreignKey: 'gallery_id',
});

Photo.belongsTo(Gallery, {
  foreignKey: 'photo_id',
});

module.exports = { User, Gallery, Photo };
