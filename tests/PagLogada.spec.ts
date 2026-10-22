import { test, expect } from '../fixtures/auth.fixture';

test.describe('acesso area protegida - painel', () => {

    test('Deve acessar painel com usuario já logado', async ({ loggedPage }) => {
        //Validar se está na página do painel
        await expect(loggedPage).toHaveURL(/painel\.html/);
        //Verificar a existência do H1
        const h1Painel = loggedPage.locator('#panelTitle');
        await expect(h1Painel).toBeVisible();
        //Verificar presençã do botão de logout
        const btSair = loggedPage.locator('#logoutButton');
        await expect(btSair).toBeVisible();
    });
});