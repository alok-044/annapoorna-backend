const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FoodListing = require('../models/FoodListing');
const upload = require('../middleware/upload');

// @route   POST /api/listings
// @desc    Create a food listing
// @access  Private (Donor only)
router.post(
  '/',
  auth,
  upload.single('foodImage'),
  async (req, res) => {
    
    if (req.user.role !== 'donor') {
      return res.status(403).json({ message: 'Authorization denied' });
    }

    try {
      // --- FIX: Use local path logic ---
      const imagePath = req.file ? req.file.path.replace(/\\/g, "/") : null;

      const newListing = new FoodListing({
        user: req.user.id,
        title: req.body.title,
        quantity: req.body.quantity,
        type: req.body.type,
        expiry: req.body.expiry,
        location: JSON.parse(req.body.location),
        image: imagePath // Use the local path
      });

      const listing = await newListing.save();
      res.json(listing);

    } catch (err) {
      console.error("Listing Error:", err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/listings
// @desc    Get all food listings
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Populate user name so we can show who donated
    const listings = await FoodListing.find()
      .sort({ datePosted: -1 })
      .populate('user', ['name', 'email']);
      
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;