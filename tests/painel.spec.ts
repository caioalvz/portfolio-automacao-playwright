import { test, expect } from '@playwright/test';

const BASE_URL = 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login';

test.describe('Testando painel de adiministrador', async () =>{

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/login.html`);
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#loginBtn')).toBeVisible();
        await expect(page.locator('#loginBtn')).toBeDisabled();
        await page.fill('#email', 'admin@system.com');
        await page.fill('#password', 'AdminPassword123');
        await expect(page.locator('#loginBtn')).toBeEnabled();
        await page.click('#loginBtn');
        await expect(page).toHaveURL(/painel\.html/);
        });

    test('Acessando usuários', async ({page}) =>{
        await page.locator(`[data-tab="users"]`).click();
        await page.waitForTimeout(3000);
        await page.getByRole('button', {name: 'Administrador'}).click();
        

    });

    test('Acessando lojas', async ({page}) =>{
        await page.locator(`[data-tab="stores"]`).click();
        await page.waitForTimeout(3000);
        await page.getByRole('button', {name: 'Vitrine Tech'}).click();
    });

    test('Acessando produtos', async ({page}) =>{
        await page.locator(`[data-tab="products"]`).click();
        await page.waitForTimeout(3000);
        await page.getByRole('button', {name: 'Mouse Óptico Atlas'}).click();
        
    });

});