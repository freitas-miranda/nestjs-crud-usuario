import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from '../usuario.controller';
import { UsuarioService } from '../usuario.service';
import { mockUsuariosService } from './mock.usuario';

describe('UsuarioController', () => {
  let controller: UsuarioController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
