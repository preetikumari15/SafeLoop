const router = require('express').Router();
const auth = require('../middleware/auth');
const Journal = require('../models/Journal');

router.post('/save', auth, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const { entry } = req.body;
    if (!entry) {
      return res.status(400).json({ message: 'Entry content is required' });
    }

    const newJournal = new Journal({
      userId: req.user.id,
      entry: entry
    });

    await newJournal.save();
    res.status(201).json({ message: 'Journal entry saved successfully' });
  } catch (error) {
    console.error('Error saving journal:', error);
    res.status(500).json({ message: 'Error saving journal entry' });
  }
});

router.get('/entries', auth, async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); 
    res.status(200).json(entries);
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    res.status(500).json({ message: 'Error fetching journal entries' });
  }
});

module.exports = router;



