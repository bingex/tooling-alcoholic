import express from 'express';
import dotenv from 'dotenv';
import users from './routes/users';
import auth from './routes/auth';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing incoming requests with JSON payloads
app.use(express.json());

app.get('/', (req, res) => res.send('App works!'));
app.use('/api/users', users);
app.use('/api/auth', auth);

// Start app listening on port
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
