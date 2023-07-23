import { CreateUsuarioDto } from '../dto/create-usuario.dto';

export const mockUsuario = {
  nome: 'Name #1',
  email: 'Email #1',
  senha: '12345678',
};

export const mockListUsuarios = [{ ...mockUsuario }, { ...mockUsuario }];

export const mockUsuariosRepository = {
  find: jest.fn().mockResolvedValue(mockListUsuarios),
  findOneBy: jest.fn().mockResolvedValue(mockUsuario),
  save: jest.fn().mockResolvedValue(mockUsuario),
  remove: jest.fn(),
  delete: jest.fn(),
};

export const mockUsuariosService = {
  create: jest
    .fn()
    .mockImplementation((usuario: CreateUsuarioDto) =>
      Promise.resolve({ id: '1', ...usuario }),
    ),
  findAll: jest.fn().mockResolvedValue(mockListUsuarios),
  findOne: jest.fn().mockImplementation((id: string) =>
    Promise.resolve({
      ...mockUsuario,
      id,
    }),
  ),
  remove: jest.fn(),
};
