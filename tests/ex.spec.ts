import {test, expect} from '../fixtures/auth.fixture.ts';

test('usario já logado', async({loggedPage}) =>{
    await expect(loggedPage).toHaveURL('/painel\.html/')
});