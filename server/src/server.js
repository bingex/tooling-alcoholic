import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import users from './routes/users';
import auth from './routes/auth';
import tools from './routes/tools';
import toolTypes from './routes/toolTypes';
import companies from './routes/companies';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('App works!'));

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/tools', tools);
app.use('/api/tool_types', toolTypes);
app.use('/api/companies', companies);

// Start app listening on port
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
