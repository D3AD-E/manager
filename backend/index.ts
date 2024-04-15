import express from 'express';
import walletRouter from './src/routes/wallet';

const app = express();

const port = 3000;

app.use('/wallet', walletRouter)
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});