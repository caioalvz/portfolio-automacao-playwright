import { test, expect, request } from "@playwright/test";

const APIUrl= 'https://api-qa-fap2026.onrender.com/api'

test.describe('teste api LojaQA', () => {
    test("get catalogo loja QA", async ({ request }) => {
        const res = await request.get(`${APIUrl}/products`);
        //VALIDA STATUS CODE 200
        expect(res.status()).toBe(200);
        //VALIDA STATUS CODE ENTRE 200 E 299 (STATUS DE SUCESSO DE API OK)
        expect(res.ok).toBeTruthy();

        const bodyRes = await res.json();
        const primeiroProduto = bodyRes[0];

        expect(primeiroProduto).toHaveProperty('_id', "6abe51a2384f04df16c614fe");
        expect(primeiroProduto).toHaveProperty('name');
        expect(typeof primeiroProduto.name).toBe('string');
    })

    test("Post login loja QA", async ({ request }) => {
         const res = await request.post(`${APIUrl}/login`,
            {
                data : {
                "email": "admin@system.com",
                "password": "AdminPassword123"
                },
                headers:{'Content-Type':'application/json'}
            }
         );

    //VALIDA STATUS CODE 200
    expect(res.status()).toBe(200);
    //VALIDA JSON
    const resBody = await res.json();
    expect(resBody).toHaveProperty("token");
    expect(typeof resBody.token).toBe('string');
    expect(resBody.token.length).toBeGreaterThan(10);
    
    })
})