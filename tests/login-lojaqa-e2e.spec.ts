import { test, expect } from '@playwright/test';

const BASE_URL = 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login';

test.describe('ato 1 - validar carregamento e visibilidade de elementos', async () => {

    test('Validar título e carregamento da página', async ({ page }) => {
        //Navegar até página de login
        await page.goto(`${BASE_URL}/login.html`)
        //Validar título
        await expect(page).toHaveTitle(/LojaQA | Entrar/i)
    });
    test('Verificar exibição dos campos do form de login', async ({ page }) => {
        //Navegar até página de login
        await page.goto(`${BASE_URL}/login.html`)

        //validar campos
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#loginBtn')).toBeVisible();
        //verificar se btn está desativado
        await expect(page.locator('#loginBtn')).toBeDisabled();


    });
});

test.describe('ato 2 - caminho feliz', () => {

    test('Validar acesso e redirecionar ao painel', async ({ page }) => {
        //Navegar até página de login
        await page.goto(`${BASE_URL}/login.html`);
        //Preencher campos utilizando o fill()
        await page.fill('#email', 'admin@system.com');
        await page.fill('#password', 'AdminPassword123');
        //Validar botão ativo
        await expect(page.locator('#loginBtn')).toBeEnabled();
        //Ação de clique
        await page.click('#loginBtn');
        //Validar o redirecionamento para a página /painel
        await expect(page).toHaveURL(/painel\.html/);
    });
    test('Verificar botão login desativado quando email incorreto', async ({ page }) => {
        //Navegar até página de login
        await page.goto(`${BASE_URL}/login.html`);

        //preencher utilizando o fill()
        await page.fill('#email', 'email_sem_formato');
        await page.fill('#password', '12345678');
        //Validar botão ativo
        await expect(page.locator('#loginBtn')).toBeDisabled();
    });
});

test.describe('ato 3 - Validar página e efetuar Cadastro', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/login.html`);
        //Acessar tela de cadastro
        await page.click('.login-links a');
    });

    test('Validar página', async ({ page }) => {
        //Validar título
        await expect(page).toHaveTitle(/QA System - Cadastro/i);
        //validar campos
        await expect(page.locator('#reg-name')).toBeVisible();
        await expect(page.locator('#reg-email')).toBeVisible();
        await expect(page.locator('#reg-password')).toBeVisible();
        await expect(page.locator('#reg-role')).toBeVisible();
    });

    test('Efetuar Cadastro usuário', async ({ page }) => {
        //Gerar id aleatório
        const randomId = Date.now();
        const usuarioAleatorio = `Usuario ${randomId}`;
        const emailAleatorio = `email${randomId}@test.com`;
        const senhaAleatoria = `senha ${randomId}`;

        //preencher utilizando o fill()
        await page.fill('#reg-name', `${usuarioAleatorio}`);
        await page.fill('#reg-email', `${emailAleatorio}`);
        await page.fill('#reg-password', `${senhaAleatoria}`);
        await page.selectOption('#reg-role', 'Cliente')
        //Verificar botão e clicar
        await expect(page.locator('#registerBtn')).toBeEnabled();
        await page.click('#registerBtn');
    });

    test('Efetuar Cadastro vendedor', async ({ page }) => {
        //Gerar id aleatório
        const randomId = Date.now();
        const usuarioAleatorio = `Usuario ${randomId}`;
        const emailAleatorio = `email${randomId}@test.com`;
        const senhaAleatoria = `${randomId}`;
        const lojaAleatoria = `loja ${randomId}`

        //preencher utilizando o fill()
        await page.fill('#reg-name', `${usuarioAleatorio}`);
        await page.fill('#reg-email', `${emailAleatorio}`);
        await page.fill('#reg-password', `${senhaAleatoria}`);
        await page.selectOption('#reg-role', 'Lojista / vendedor')
        await expect(page.locator('#reg-store-name')).toBeVisible();
        await page.fill('#reg-store-name', `${lojaAleatoria}`);
        //Verificar botão e clicar
        await expect(page.locator('#registerBtn')).toBeEnabled();
        await page.click('#registerBtn');
    });
});
