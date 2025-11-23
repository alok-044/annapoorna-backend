// annapoorna-backend/routes/admin.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const User = require('../models/User');

// @route   GET /api/admin/unverified-ngos
// @desc    Get all users (NGOs) that are not verified
// @access  Private (Admin only)
router.get('/unverified-ngos', [auth, admin], async (req, res) => {
  try {
    // Find receivers who are not verified and have a document URL
    const ngos = await User.find({ 
      role: 'receiver', 
      isVerified: false,
      ngoDocumentUrl: { $ne: null } // Only show those who uploaded a doc
    }).select('-password'); // Don't send password

    res.json(ngos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/admin/verify-ngo/:id
// @desc    Mark an NGO as verified
// @access  Private (Admin only)
router.put('/verify-ngo/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isVerified = true;
    await user.save();

    res.json({ message: 'User verified successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;