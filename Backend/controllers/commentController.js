const Comment = require('../models/Comment');
const Ticket = require('../models/Ticket');

exports.addComment = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);
    if(!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    const comment = await Comment.create({
      ticketId: ticket._id,
      userId: req.user.id,
      text: req.body.text
    });

    res.json(comment);
  } catch(err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ ticketId: req.params.ticketId }).populate('userId','name').sort({ createdAt: 1 });
    res.json(comments);
  } catch(err) {
    res.status(500).json({ msg: err.message });
  }
};
