const router = require('express').Router();
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/blogs', postRoutes);

module.exports = router;