const User = require('./User');
const Gallery = require('./Gallery');
const Photo = require('./Photo');

Gallery.hasMany(Photo, {
  foreignKey: 'gallery_id',
});

Photo.belongsTo(Gallery, {
  foreignKey: 'photo_id',
});

module.exports = { User, Gallery, Photo };
