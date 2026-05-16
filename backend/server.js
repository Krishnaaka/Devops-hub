require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth');
const courseRoutes = require('./src/routes/courses');
const progressRoutes = require('./src/routes/progress');
const deploymentRoutes = require('./src/routes/deployments');
const metricRoutes = require('./src/routes/metrics');
const client = require('prom-client');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Prometheus metrics endpoint
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/deployments', deploymentRoutes);
app.use('/api/metrics', metricRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to connect to DB', err);
  process.exit(1);
});
