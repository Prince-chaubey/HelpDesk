const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    let hours = 72;
    if(priority === 'High') hours = 24;
    else if(priority === 'Medium') hours = 48;
    
    const dueDate = new Date(Date.now() + hours*60*60*1000);

    const ticket = await Ticket.create({
      title, description, priority, dueDate, userId: req.user.id
    });
    res.json(ticket);
  } catch(err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    await Ticket.updateMany({ status: { $ne: 'Closed' }, dueDate: { $lt: new Date() } }, { $set: { status: 'Overdue' } });

    const tickets = req.user.role === 'admin' ?
      await Ticket.find().populate('userId','name email').sort({ createdAt: -1 }) :
      await Ticket.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.json(tickets);
  } catch(err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('userId','name email');
    if(!ticket) return res.status(404).json({ msg: 'Ticket not found' });
    res.json(ticket);
  } catch(err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if(req.user.role !== 'admin') return res.status(403).json({ msg: 'Not allowed' });

    const ticket = await Ticket.findById(req.params.id);
    if(!ticket) return res.status(404).json({ msg: 'Ticket not found' });

    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch(err) {
    res.status(500).json({ msg: err.message });
  }
};
