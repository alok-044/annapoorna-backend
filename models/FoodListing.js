// models/FoodListing.js
const mongoose = require('mongoose');

const FoodListingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (the donor)
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  quantity: {
    type: String, // e.g., "Serves 5-6 people", "5kg", "20 pieces"
    required: true,
  },
  type: {
    type: String,
    enum: ['Veg', 'Non-Veg'], // e.g., "Veg", "Non-Veg"
    required: true,
  },
  expiry: {
    type: String, // e.g., "2 hours" (pickup hours), "2023-12-31"
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String, // URL to the food image
  },
  location: {
    address: String,
    latitude: Number,
    longitude: Number,
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'picked_up', 'expired'],
    default: 'available',
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model (the receiver)
  },
  claimDate: {
    type: Date,
  },
  datePosted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('FoodListing', FoodListingSchema);