import { test, expect } from "@playwright/test";

const APIUrl = 'https://api-qa-fap2026.onrender.com/api';

test.describe("Testes api no padrão AAR, com geração de massa para UI", () => {
    // Declarando as variáveis compartilhadas no contexto do describe
    let authToken: string;
    let createdProdID: string;
    const uniqueProdName = `Teclado Mecânico ${Date.now()}`;

    // ARRANGE (SETUP: login Lojista e criação de massa)
    test.beforeAll(async ({ request }) => {
        const loginRes = await request.post(`${APIUrl}/login`, {
            data: {
                email: 'lojista@system.com',
                password: 'SellerPass123'
            }
        });
        
        expect(loginRes.status()).toBe(200);
        const loginData = await loginRes.json();
        authToken = loginData.token;
        expect(authToken).toBeDefined();

        // Criar massa de teste (cria um produto)
        const productRes = await request.post(`${APIUrl}/seller/products`, { 
            headers: {
                Authorization: `Bearer ${authToken}`
            },
            data: {
                "name": uniqueProdName,
                "description": "Massa de teste gerada no setup API do tio alison",
                "category": "Periféricos",
                "price": 87.9,
                "stock": 323,
                "image": "https://exemplo.com/imagens/teclado.jpg"
            }
        });
        
        expect(productRes.status()).toBe(201);
        const productBody = await productRes.json();
        
        // Ajuste caso o retorno da API coloque o ID direto em productBody._id ou productBody.product._id
        createdProdID = productBody._id || productBody.product?._id;
        expect(createdProdID).toBeDefined();
    });

    test("Validar produto recem criado", async ({ request }) => {
        expect(createdProdID).toBeDefined();
        
        // Corrigido a quebra de linha na template string para evitar URL inválida
        const res = await request.get(`${APIUrl}/products?search=${encodeURIComponent(uniqueProdName)}`);
        
        expect(res.status()).toBe(200);
        const productData = await res.json();
        expect(Array.isArray(productData)).toBeTruthy();
        
        const targetProd = productData.find((p: any) => p._id === createdProdID);
        expect(targetProd).toBeDefined();  
        expect(targetProd.name).toBe(uniqueProdName);
        expect(targetProd.stock).toBe(323);
        expect(targetProd.price).toBe(87.9);  
    });

    // RELEASE (TEARDOWN): Garante a limpeza do ambiente
    test.afterAll(async ({ request }) => {
        if (createdProdID && authToken) {
            // Corrigido a requisição PUT e adição do cabeçalho de autorização se necessário
            const tearDownRes = await request.put(`${APIUrl}/seller/products/${createdProdID}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
                data: {
                    active: false // Ou o campo correspondente para inativar o produto na sua API
                }
            });
            expect(tearDownRes.status()).toBe(200)
        }
    });
});