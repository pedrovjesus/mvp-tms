import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupE2ETestApp } from '../utils/setup-e2e';

describe('AddressController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupE2ETestApp();
  });

  it('Deve criar um novo endereço (POST /address)', async () => {
    const response = await request(app.getHttpServer()).post('/address').send({
      city: 'Campinas',
      uf: 'SP',
      street: 'Rua Exemplo',
      number: '123',
      cep: '13000-000',
      complement: 'Apto 101',
    });

    console.log(response.body); // <-- Veja aqui o motivo do 400

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.city).toBe('Campinas');
  });

  it('Deve falhar se faltar um campo obrigatório', async () => {
    await request(app.getHttpServer())
      .post('/address')
      .send({
        number: 123,
        street: 'Rua sem CEP',
        city: 'Campinas',
        uf: 'SP',
      })
      .expect(400); // erro de validação
  });

  afterAll(async () => {
    await app.close();
  });
});
