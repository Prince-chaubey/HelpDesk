const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTicket, getTickets, getTicketById, updateTicketStatus } = require('../controllers/ticketController');

router.post('/', auth, createTicket);
router.get('/', auth, getTickets);
router.get('/:id', auth, getTicketById);
router.put('/:id', auth, updateTicketStatus);

module.exports = router;
