import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@src/app.module';
import { mockUsuario } from './mock.usuario';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

let usuarioId = 0;

describe('/usuario (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('[POST /usuario] Criar um usuário', async () => {
    return request(app.getHttpServer())
      .post('/usuario')
      .send(mockUsuario as CreateUsuarioDto)
      .expect(201)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body).toHaveProperty('id');

        usuarioId = body.id;
      });
  });

  it('[GET /usuario] Obter todos usuarios ', async () => {
    return request(app.getHttpServer())
      .get('/usuario')
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body.length).toBeGreaterThanOrEqual(1);
      });
  });

  it('[GET /usuario/:id] Obter um usuário', async () => {
    return request(app.getHttpServer())
      .get('/usuario/' + usuarioId)
      .expect(200)
      .then(({ body }) => {
        expect(body).toBeDefined();
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('nome');
        expect(body).toHaveProperty('email');
        expect(body).not.toHaveProperty('senhaHash');
        expect(body).not.toHaveProperty('senhaSalt');
      });
  });

  it('[DELETE /usuario/:id] Deletar um usuario', () => {
    return request(app.getHttpServer())
      .delete('/usuario/' + usuarioId)
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
