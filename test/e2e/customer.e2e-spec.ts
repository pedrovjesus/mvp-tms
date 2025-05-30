import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupE2ETestApp } from '../utils/setup-e2e';

describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupE2ETestApp();
  });

  it('Deve criar um novo cliente (POST /customer)', async () => {
    const response = await request(app.getHttpServer())
      .post('/customer')
      .send({
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        phone: '11999999999',
        cpfCnpj: '12345678901',
        personType: 'Física',
        stateRegistration: 'IS123456',
        contributionType: 'Normal',
        taxRegime: 'Simples Nacional',
        fantasyName: 'JS Serviços',
        address: {
          street: 'Rua Exemplo',
          number: 123,
          complement: 'Apto 45',
          neighborhood: 'Centro',
          city: 'Campinas',
          uf: 'SP',
          cep: '13000-000',
        },
      });
    expect(response.status).toBe(201);
  });

  it('Deve falhar se faltar um campo obrigatório', async () => {
    const response = await request(app.getHttpServer())
      .post('/customer')
      .send({
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        phone: '11999999999',
        cpfCnpj: '12345678901',
        personType: 'Física',
        stateRegistration: 'IS123456',
        contributionType: 'Normal',
        fantasyName: 'JS Serviços',
        address: {
          street: 'Rua Exemplo',
          number: 123,
          complement: 'Apto 45',
          neighborhood: 'Centro',
          city: 'Campinas',
          uf: 'SP',
          cep: '13000-000',
        },
      });
    expect(response.status).toBe(400);
  });

  it('Deve listar todos os clientes (GET /customer)', async () => {
    const response = await request(app.getHttpServer()).get('/customer');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
  it('Deve listar o cliente pelo cep (GET /customer?cpfCnpj=)', async () => {
    let response = await request(app.getHttpServer())
      .post('/customer')
      .send({
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        phone: '11999999999',
        cpfCnpj: '12345678901',
        personType: 'Física',
        stateRegistration: 'IS123456',
        contributionType: 'Normal',
        taxRegime: 'Simples Nacional',
        fantasyName: 'JS Serviços',
        address: {
          street: 'Rua Exemplo',
          number: 123,
          complement: 'Apto 45',
          neighborhood: 'Centro',
          city: 'Campinas',
          uf: 'SP',
          cep: '13000-000',
        },
      }); // cria um cliente para procurar
    response = await request(app.getHttpServer()).get(
      `/customer?cpfcnpj=12345678901`,
    );
    expect(response.status).toBe(200);
  });

  it('Deve falhar ao buscar um cliente inexistente (GET /customer?cpfCnpj=)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/customer?cpfcnpj=99999999999',
    );

    expect(response.status).toBe(404);
  });
  it('Deve deletar um cliente existente (DELETE /customer?id=)', async () => {
    const response = await request(app.getHttpServer())
      .post('/customer')
      .send({
        name: 'João da Silva',
        email: 'joao.silva@example.com',
        phone: '11999999999',
        cpfCnpj: '12345678901',
        personType: 'Física',
        stateRegistration: 'IS123456',
        contributionType: 'Normal',
        taxRegime: 'Simples Nacional',
        fantasyName: 'JS Serviços',
        address: {
          street: 'Rua Exemplo',
          number: 123,
          complement: 'Apto 45',
          neighborhood: 'Centro',
          city: 'Campinas',
          uf: 'SP',
          cep: '13000-000',
        },
      }); // cria um cliente para deletar

    const createdCustomerCpfCnpj = response.body.cpfcnpj;
    const deleteResponse = await request(app.getHttpServer()).delete(
      `/customer?cpfcnpj=${createdCustomerCpfCnpj}`,
    );
    expect(deleteResponse.status).toBe(204);
  });

  afterAll(async () => {
    await app.close();
  });
});
