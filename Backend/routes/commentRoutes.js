const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middleware/authMiddleware');
const { addComment, getComments } = require('../controllers/commentController');

router.post('/', auth, addComment);
router.get('/', auth, getComments);

module.exports = router;
