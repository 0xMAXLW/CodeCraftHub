const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());

// Routes setup
app.use('/api/users', require('./src/routes/userRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});