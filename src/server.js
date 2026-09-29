const dns = require('dns');
const app = require('./app');
const connectDB = require('./config/db');

// Use Google's DNS servers for MongoDB Atlas SRV resolution.
// This fixes Node.js DNS resolution issues with mongodb+srv:// URIs.
dns.setServers(['8.8.8.8', '8.8.4.4']);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      // console.log('Press Ctrl+C to terminate.');
    });
  })
  .catch((error) => {
    console.error(
      'Database connection failed. Express server aborted:',
      error.message
    );
    process.exit(1);
  });