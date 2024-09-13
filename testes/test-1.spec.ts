import { test, expect } from '@playwright/test';

test('test de login', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  const email = await page.getByPlaceholder('Digite seu email');
  email.click();
  email.fill('saviorodrigues802@gmail.com');
  console.log(email);

  // email.press('Tab');

  const senha = await page.getByPlaceholder('Digite sua senha');
  senha.click();
  // senha.fill('Sarah1710!');

  //const butao =  await page.getByRole('button', { name: 'Entrar' }).click();
  
  // await page.getByRole('button', { name: 'Imagem do título Sávio' }).click();
  // await page.getByRole('link', { name: 'Minha conta' }).click();
  // await page.getByRole('main').getByText('Sávio Rodrigues').click();
  // await page.getByText('saviorodrigues802@gmail.com').click();
  
  // const nome = await page.getByRole('main').getByText('Sávio Rodrigues');
  // expect(nome).toBe("Sáviiiio Rodrigues")
});