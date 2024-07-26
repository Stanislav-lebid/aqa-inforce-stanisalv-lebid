# Налаштування та запуск тестів

## Встановлення Node.js

Для запуску тестів Playwright потрібно мати встановлений Node.js. Завантажте та встановіть останню версію Node.js з [офіційного сайту](https://nodejs.org/).

## Встановлення Playwright

Встановіть Playwright за допомогою npm:

    npm install @playwright/test

##Налаштування Playwright
Після встановлення Playwright, виконайте команду для автоматичної установки необхідних браузерів:

    npx playwright install
Ця команда встановить браузери Chromium, Firefox і WebKit, а також створить базовий конфігураційний файл для тестування.

##Створення тестового файлу
Створіть файл для ваших тестів, наприклад login.test.js, у кореневій директорії вашого проекту.

##Написання тестів
Відкрийте створений файл у текстовому редакторі та напишіть ваші тести. Наприклад:

    const { chromium } = require('playwright');
    
    (async () => {
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext();
      const page = await context.newPage();
    
      await page.goto('https://www.demoblaze.com/index.html');
    
      const categories = await page.$$('div.list-group a.list-group-item');
      const categoryNames = await Promise.all(categories.map(category => category.innerText()));
      console.log('Categories:', categoryNames);
    
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
    
      for (let i = 1; i < categories.length; i++) {
        const category = categories[i];
        const categoryName = await category.innerText();
        await category.click();
    
        await page.waitForSelector('div#tbodyid div.col-lg-4');
    
        const productCards = await page.$$('div#tbodyid div.col-lg-4');
        console.log(`${categoryName} Products:`, productCards.length);
    
        if (productCards.length > 0) {
          console.log(`Product cards for category "${categoryName}" loaded successfully.`);
        } else {
          console.error(`No product cards found for category "${categoryName}".`);
        }
    
        for (const productCard of productCards) {
          const productName = await productCard.$eval('h4', el => el.innerText);
          const productDescription = await productCard.$eval('p', el => el.innerText);
          const productPrice = await productCard.$eval('h5', el => el.innerText);
    
          console.log(`Product: ${productName}`);
          console.log(`Description: ${productDescription}`);
          console.log(`Price: ${productPrice}`);
    
          if (!productName || !productDescription || !productPrice) {
            console.error('Product card validation failed');
          } else {
            console.log('Product card validated successfully.');
          }
        }
      }
    
      await browser.close();
    })();

##Запуск тестів
Щоб запустити тести, скористайтеся наступною командою:

    npx playwright test
Ця команда запустить всі тести, що знаходяться у вашому проекті.

##Перегляд результатів тестів
Результати виконання тестів будуть відображені у терміналі. Ви можете переглядати деталі тестів та помилки, якщо такі є.
