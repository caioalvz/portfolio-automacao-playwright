import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Tests com page object model', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) =>{
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('LOGIN ADM COM SUCESSO VIA POM', async ({page}) =>{
        await loginPage.login('admin@system.com','AdminPassword123');
        await expect(loginPage.statusMessage).toBeVisible();
        await expect(loginPage.statusMessage).toContainText('/login bem-sucedido/');
        await expect(page).toHaveURL(/painel\.html/);
    });

    test('testar visibilidade do bt de login', async ({page}) =>{
        await expect(loginPage.loginButton).toBeDisabled();

    });
});