import mongoose from 'mongoose';

const blockedRegionSchema = new mongoose.Schema({
  region: {
    type: String,
    trim: true,
  },
  regionName: {
    type: String,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  countryName: {
    type: String,
    trim: true,
  },

}, {
  timestamps: true
});

const BlockedRegion = mongoose.model('BlockedRegion', blockedRegionSchema);

export default BlockedRegion;
