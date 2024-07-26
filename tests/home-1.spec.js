const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the webpage
  await page.goto('https://www.demoblaze.com/index.html');

  // Verify categories
  const categories = await page.$$('div.list-group a.list-group-item');
  const categoryNames = await Promise.all(categories.map(category => category.innerText()));
  console.log('Categories:', categoryNames);

  // Check for expected categories
  const expectedCategories = ['CATEGORIES', 'Phones', 'Laptops', 'Monitors'];
  let allCategoriesFound = true;

  expectedCategories.forEach(expectedCategory => {
    if (!categoryNames.includes(expectedCategory)) {
      console.error(`Category "${expectedCategory}" not found!`);
      allCategoriesFound = false;
    }
  });

  if (allCategoriesFound) {
    console.log('All expected categories were found successfully.');
  }

  // Click on each category and verify product cards
  for (let i = 1; i < categories.length; i++) {
    const category = categories[i];
    const categoryName = await category.innerText();
    await category.click();

    // Wait for products to load
    await page.waitForSelector('div#tbodyid div.col-lg-4');

    // Get all product cards
    const productCards = await page.$$('div#tbodyid div.col-lg-4');
    console.log(`${categoryName} Products:`, productCards.length);

    if (productCards.length > 0) {
      console.log(`Product cards for category "${categoryName}" loaded successfully.`);
    } else {
      console.error(`No product cards found for category "${categoryName}".`);
    }

    // Verify each product card
    for (const productCard of productCards) {
      const productName = await productCard.$eval('h4', el => el.innerText);
      const productDescription = await productCard.$eval('p', el => el.innerText);
      const productPrice = await productCard.$eval('h5', el => el.innerText);

      console.log(`Product: ${productName}`);
      console.log(`Description: ${productDescription}`);
      console.log(`Price: ${productPrice}`);

      // Add your assertions here (e.g., check for non-empty values, specific formats, etc.)
      if (!productName || !productDescription || !productPrice) {
        console.error('Product card validation failed');
      } else {
        console.log('Product card validated successfully.');
      }
    }
  }

  // Close the browser
  await browser.close();
})();
