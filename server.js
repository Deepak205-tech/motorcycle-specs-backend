const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/motorcycles', (req, res) => {
  const dataPath = path.join(__dirname, 'scraper', 'mockData.json');
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }
    try {
      const motorcycles = JSON.parse(data);
      res.json(motorcycles);
    } catch (parseErr) {
      res.status(500).json({ error: 'Failed to parse data' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.use(cors({
  origin: 'https://vercel.com/deepak205-techs-projects/motorcycle-specs-frontend', // or '*' for all origins, but better to specify frontend URL
}));