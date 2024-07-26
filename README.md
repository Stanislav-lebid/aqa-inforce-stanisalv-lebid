# Налаштування та запуск тестів Playwright

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
Відкрийте створений файл у текстовому редакторі та напишіть ваші тести. Ось приклад тестів для функціональності логіну та реєстрації:

const { test, expect } = require('@playwright/test');

test.describe('Login functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html'); 
  });

  test('Valid login', async ({ page }) => {
    await page.click('a#login2'); // Клацніть на посилання "Log in", щоб відкрити модальне вікно

    await page.fill('#loginusername', 'User1'); // Замініть 'User1' на фактичне ім'я користувача
    await page.fill('#loginpassword', 'Password1'); // Замініть 'Password1' на фактичний пароль

    await page.click('button:has-text("Log in")');

    await expect(page.locator('#nameofuser')).toHaveText('User1'); // Змініть відповідно до фактичного очікуваного результату
  });

  test('Invalid login', async ({ page }) => {
    await page.click('a#login2'); 

    await page.fill('#loginusername', 'invaliduser');
    await page.fill('#loginpassword', 'wrongpassword');

    await page.click('button:has-text("Log in")');

    Додати перевірку очікуваного повідомлення про помилку
    await expect(page.locator('#errorl')).toHaveText('Invalid username or password'); // Змініть відповідно до фактичного повідомлення про помилку
  });
});
##Запуск тестів
Щоб запустити тести, скористайтеся наступною командою:

npx playwright test
Ця команда запустить всі тести, що знаходяться у вашому проекті.

##Перегляд результатів тестів
Результати виконання тестів будуть відображені у терміналі. Ви можете переглядати деталі тестів та помилки, якщо такі є.
