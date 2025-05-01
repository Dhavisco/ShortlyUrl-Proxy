// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use(cors({
//   origin: '*', // or replace '*' with your frontend origin (e.g., 'http://localhost:5173')
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type'],
// }));

// app.get('/', (req, res) => {
//   res.send('URL Shortener Proxy is running');
// });

// app.options('*', cors());

// app.post('/shorten', async (req, res) => {
//   const { url } = req.body;

//   if (!url) {
//     return res.status(400).json({ error: 'Missing URL' });
//   }

//   try {
//     const formData = new URLSearchParams();
//     formData.append('url', url);

//     const response = await axios.post('https://cleanuri.com/api/v1/shorten', formData.toString(), {
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error('Error shortening URL:', error.message);
//     res.status(500).json({ error: 'Failed to shorten URL' });
//   }
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Use proper CORS configuration (only once)
app.use(cors({
  origin: '*', // Replace with actual frontend origin in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

// Handle preflight requests globally
app.options('*', cors());

// Test route
app.get('/', (req, res) => {
  res.send('URL Shortener Proxy is running');
});

// Shorten URL route
app.post('/shorten', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const formData = new URLSearchParams();
    formData.append('url', url);

    const response = await axios.post('https://cleanuri.com/api/v1/shorten', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // Explicitly set CORS headers on the response
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.json(response.data);
  } catch (error) {
    console.error('Error shortening URL:', error.message);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));
