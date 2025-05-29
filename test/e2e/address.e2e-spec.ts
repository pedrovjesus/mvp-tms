import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { setupE2ETestApp } from '../utils/setup-e2e';

describe('AddressController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await setupE2ETestApp();
  });

  describe('AddressController (e2e)', () => {
    let createdAddressId: number;

    it('Deve criar um novo endereço (POST /address)', async () => {
      const response = await request(app.getHttpServer())
        .post('/address')
        .send({
          city: 'Campinas',
          uf: 'SP',
          street: 'Rua Exemplo',
          number: 123, // número como número
          cep: '13000-000',
          complement: 'Apto 101',
        });

      console.log('Create response:', response.body); // útil para debug

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');

      createdAddressId = response.body.id; // salva ID para os testes seguintes
      console.log('Created Address ID:', createdAddressId);

      expect(response.body.city).toBe('Campinas');
    });

    it('Deve falhar se faltar um campo obrigatório', async () => {
      const response = await request(app.getHttpServer())
        .post('/address')
        .send({
          number: 123,
          street: 'Rua sem CEP',
          city: 'Campinas',
          uf: 'SP',
        });

      console.log('Validation error:', response.body);
      expect(response.status).toBe(400);
    });

    it('Deve listar todos os endereços (GET /address)', async () => {
      const response = await request(app.getHttpServer()).get('/address');

      // Verifica se o status da resposta é 200
      expect(response.status).toBe(200);

      // Verifica se o corpo da resposta é um array
      const addresses = response.body;
      expect(Array.isArray(addresses)).toBe(true);
    });

    it('Deve buscar um endereço por ID (GET /address/:id)', async () => {
      let response = await request(app.getHttpServer()).post('/address').send({
        city: 'Campinas',
        uf: 'SP',
        street: 'Rua Exemplo',
        number: 123,
        cep: '13000-000',
        complement: 'Apto 101',
      }); //cria um endereço para procurar
      response = await request(app.getHttpServer()).get(
        `/address?id=${createdAddressId}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.id).toBe(createdAddressId);
    });

    it('Deve falhar ao buscar um endereço inexistente (GET /address/:id)', async () => {
      await request(app.getHttpServer()).get('/address?id=9999').expect(404);
    });

    it('Deve atualizar um endereço existente (PUT /address?id=)', async () => {
      let response = await request(app.getHttpServer()).post('/address').send({
        city: 'Campinas',
        uf: 'SP',
        street: 'Rua Exemplo',
        number: 123,
        cep: '13000-000',
        complement: 'Apto 101',
      }); //cria um endereço para atualizar
      response = await request(app.getHttpServer())
        .put(`/address?id=${createdAddressId}`)
        .send({
          city: 'São Paulo',
          uf: 'SP',
          street: 'Rua Atualizada',
          number: 456,
          cep: '01000-000',
          complement: 'Apto 202',
        });

      expect(response.status).toBe(200);
      expect(response.body.city).toBe('São Paulo');
    });

    it('Deve falhar ao atualizar um endereço inexistente (PUT /address?id=)', async () => {
      await request(app.getHttpServer())
        .put('/address?id=9999')
        .send({
          city: 'Cidade Inexistente',
          uf: 'XX',
          street: 'Rua Inexistente',
          number: 0,
          cep: '00000-000',
          complement: 'Apto 000',
        })
        .expect(404);
    });

    it('Deve deletar um endereço existente (DELETE /address?id=1)', async () => {
      let response = await request(app.getHttpServer()).post('/address').send({
        city: 'Campinas',
        uf: 'SP',
        street: 'Rua Exemplo',
        number: 123,
        cep: '13000-000',
        complement: 'Apto 101',
      }); //cria um endereço para deletar

      response = await request(app.getHttpServer()).delete(
        `/address?id=${createdAddressId}`,
      );
      console.log('Delete response:', response.status, response.body);

      expect(response.status).toBe(204); // <- só se o controller realmente retorna 204
    });

    it('Deve falhar ao deletar um endereço inexistente (DELETE /address/:id)', async () => {
      await request(app.getHttpServer()).delete('/address?id=9999').expect(404);
    });
  });

  it('Deve falhar ao deletar um endereço inexistente (DELETE /address?id=)', async () => {
    await request(app.getHttpServer())
      .delete('/address?id=9999') // ID que provavelmente não existe
      .expect(404); // erro de não encontrado
  });
  it('Deve retornar 404 ao acessar um endpoint inexistente', async () => {
    await request(app.getHttpServer())
      .get('/address/nonexistent-endpoint')
      .expect(404); // erro de não encontrado
  });
  it('Deve retornar 404 ao acessar um endpoint inexistente com método POST', async () => {
    await request(app.getHttpServer())
      .post('/address/nonexistent-endpoint')
      .send({ data: 'test' })
      .expect(404); // erro de não encontrado
  });
  it('Deve retornar 404 ao acessar um endpoint inexistente com método PUT', async () => {
    await request(app.getHttpServer())
      .put('/address/nonexistent-endpoint')
      .send({ data: 'test' })
      .expect(404); // erro de não encontrado
  });
  it('Deve retornar 404 ao acessar um endpoint inexistente com método DELETE', async () => {
    await request(app.getHttpServer())
      .delete('/address/nonexistent-endpoint')
      .expect(404); // erro de não encontrado
  });

  afterAll(async () => {
    await app.close();
  });
});
