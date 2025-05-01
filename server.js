const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('URL Shortener Proxy is running');
});

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

    res.json(response.data);
  } catch (error) {
    console.error('Error shortening URL:', error.message);
    res.status(500).json({ error: 'Failed to shorten URL' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Proxy server running at http://localhost:${PORT}`));
