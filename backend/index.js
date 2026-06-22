require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { setBroadcastCallback } = require('./utils/stocksStore');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
        credentials: true
    }
});

// Expose socket.io globally so background routines can trigger notifications
global.io = io;

const PORT = process.env.PORT || 5001;

// 1. Security Headers (Helmet)
app.use(helmet({
    contentSecurityPolicy: false // Disable CSP for local dev compatibility if needed
}));

// 2. Rate Limiting on Auth/API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per windowMs
    message: { message: 'Too many requests from this IP, please try again later.' }
});

// 3. CORS
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/zerodha')
    .then(() => console.log('MongoDB connection established successfully.'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', apiLimiter, require('./routes/auth'));
app.use('/api/stocks', require('./routes/stocks'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/watchlist', require('./routes/watchlist'));
app.use('/api', require('./routes/portfolio'));

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Zerodha Clone Backend API is active' });
});

// Connect socket.io broadcast
setBroadcastCallback((stockTicks) => {
    io.emit('stockPrices', stockTicks);
});

io.on('connection', (socket) => {
    console.log('Client connected to WebSockets:', socket.id);
    
    // Send initial stock prices immediately upon connection
    const { getStocks } = require('./utils/stocksStore');
    socket.emit('stockPrices', getStocks());

    socket.on('disconnect', () => {
        console.log('Client disconnected from WebSockets:', socket.id);
    });
});

// Start Server using http server instead of express app
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
