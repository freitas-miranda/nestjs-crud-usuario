import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from '../usuario.controller';
import { UsuarioService } from '../usuario.service';
import { mockUsuario, mockUsuariosService } from './mock.usuario';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        UsuarioService,
        {
          provide: UsuarioService,
          useValue: mockUsuariosService,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    usuarioService = module.get<UsuarioService>(UsuarioService);
  });

  describe('create()', () => {
    it('deve criar um usuario', async () => {
      const retorno = await controller.create(mockUsuario);
      expect(retorno).toBeDefined();
      expect(retorno).toEqual({ id: 1, ...mockUsuario });
      expect(usuarioService.create).toHaveBeenCalledWith(mockUsuario);
    });
  });

  describe('findAll()', () => {
    it('deve buscar todos usuários ', () => {
      controller.findAll();
      expect(usuarioService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('deve buscar um usuário', async () => {
      const retorno = await controller.findOne(1);
      expect(retorno).toBeDefined();
      expect(retorno).toEqual({ id: 1, ...mockUsuario });

      expect(usuarioService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update()', () => {
    it('deve alterar um usuario', async () => {
      await controller.update(1, { nome: 'teste' });
      expect(usuarioService.update).toHaveBeenCalledWith(1, { nome: 'teste' });
    });
  });

  describe('remove()', () => {
    it('deve remover um usuário', () => {
      controller.remove(2);
      expect(usuarioService.remove).toHaveBeenCalledWith(2);
    });
  });
});
