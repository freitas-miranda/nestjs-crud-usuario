import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from '../usuario.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import {
  mockListUsuarios,
  mockUsuario,
  mockUsuariosRepository,
} from './mock.usuario';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuariosRepository,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  describe('create()', () => {
    it('deve criar um usuário com sucesso', () => {
      expect(service.create(mockUsuario)).resolves.toEqual(mockUsuario);
    });
  });

  describe('findAll()', () => {
    it('deve retornar um array de usuários', async () => {
      const users = await service.findAll();
      expect(users).toEqual(mockListUsuarios);
    });
  });

  describe('findOne()', () => {
    it('deve retornar um usuário', () => {
      const repoSpy = jest.spyOn(mockUsuariosRepository, 'findOneBy');
      expect(service.findOne(1)).resolves.toEqual(mockUsuario);
      expect(repoSpy).toBeCalledWith({ id: 1 });
    });
  });

  describe('remove()', () => {
    it('deve remover um usuário', async () => {
      const removeSpy = jest.spyOn(mockUsuariosRepository, 'delete');
      const retVal = await service.remove(2);
      expect(removeSpy).toBeCalledWith({ id: 2 });
      expect(retVal).toBeUndefined();
    });
  });
});
