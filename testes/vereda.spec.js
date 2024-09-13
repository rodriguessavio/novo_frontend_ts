import { test, expect } from '@playwright/test'; 


//E2E
test('Tem título', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  
  await expect(page).toHaveTitle('Vite + React');
});

test('', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    
    await expect(page).toHaveTitle('Vite + React');
  });



// test('get started link', async ({ page }) => {
//   await page.goto('http://localhost:5173/');

  
//   await page.getByRole('link', { name: 'Get started' }).click();

  
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
