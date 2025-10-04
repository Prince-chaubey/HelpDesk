require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes=require('./routes/authRoutes')
const ticketRoutes=require('./routes/ticketRoutes')
const commentRoutes=require('./routes/commentRoutes')


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes);
app.use('/tickets/:ticketId/comments', commentRoutes);
app.use('/users', userRoutes);  

app.get('/', (req,res)=>res.send('HelpDesk Mini API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
