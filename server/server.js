import express, { json } from 'express';
import Middleware from './src/middleware/index.js';
import router from './src/routes/index.js';

const app = express();
const port = 8000;

// apply middleware
Middleware().init(app);
// apply routes
app.use(router)

app.listen(port, () => console.log(`App listening on port ${port}!`));
