const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionSchema = new Schema({
  Name: { type: String, required: true },
  Description:  { type: String, required: true }, 
  Wine: [{type: mongoose.Schema.Types.ObjectId, ref: 'Wine'}],
  ImagePath: { type: String },
  Island: { type: String }
});

const WineSchema = new Schema({
  Name: { type: String, required: true },
  Description:  { type: String, required: true },
  ImagePath: String,
  Body: String
});

const Region = mongoose.model('Region', RegionSchema);
const Wine = mongoose.model('Wine', WineSchema);

module.exports.Region = Region;
module.exports.Wine = Wine;

// module.exports = Wine = mongoose.model('wine', WineSchema);
// module.exports = Region = mongoose.model('region', RegionSchema);