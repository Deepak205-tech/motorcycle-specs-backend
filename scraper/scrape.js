const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Example: Use BikeWale as a target (public listing)
  await page.goto('https://www.bikewale.com/new-bike-search/', { waitUntil: 'networkidle2' });

  // Wait for bikes to load (selector may need adjustment based on actual site)
  await page.waitForSelector('.bike-card');

  const bikes = await page.evaluate(() => {
    // Adjust selectors as per the actual website structure
    const cards = Array.from(document.querySelectorAll('.bike-card'));
    return cards.map(card => ({
      name: card.querySelector('.bike-title')?.innerText.trim() || '',
      brand: card.querySelector('.bike-title')?.innerText.split(' ')[0] || '',
      engineCapacity: card.querySelector('.engine-capacity')?.innerText.trim() || '',
      power: card.querySelector('.power')?.innerText.trim() || '',
      mileage: card.querySelector('.mileage')?.innerText.trim() || '',
      price: card.querySelector('.price')?.innerText.trim() || '',
      type: card.querySelector('.type')?.innerText.trim() || ''
    }));
  });

  const outputPath = path.join(__dirname, 'mockData.json');
  fs.writeFileSync(outputPath, JSON.stringify(bikes, null, 2));

  await browser.close();
  console.log(`Scraped ${bikes.length} motorcycles. Data saved to mockData.json.`);
})();