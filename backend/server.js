import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import productRoutes from  './routes/productRoutes.js'
import categoryRoutes from  './routes/categoryRoutes.js'
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to the DATABASE"))
    .catch(err => console.error("MONGO connection error:", err));

app.get('/', (req, res) => {
    res.send('API Responding');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server runnning on http://localhost:${PORT}`);
})