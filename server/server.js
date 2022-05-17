import express from 'express';
import Middleware from './src/middleware/index.js';
import router from './src/routes/index.js';
import { ConnectToDB } from "./src/db/conn.js";
import dotenv from 'dotenv';

dotenv.config();
const PORT = parseInt(process.env.PORT);
const app = express();

// connect to database
ConnectToDB();
// apply middleware
Middleware().init(app);
// apply routes
router(app);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
