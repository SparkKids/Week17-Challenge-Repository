import express from 'express';
import db from './config/connection.js';

import userRoutes from './routes/api/userRoutes.js'; // Import your userRoutes
import thoughtRoutes from './routes/api/thoughtRoutes.js'; // Import your thoughtRoutes

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Mount the user routes
app.use('/api/users', userRoutes); // This will handle routes like POST /api/user/
// Mount the thought routes
app.use('/api/thoughts', thoughtRoutes); // This will handle routes like POST /api/user/

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
