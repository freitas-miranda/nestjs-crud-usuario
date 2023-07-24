import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = new Usuario();
    usuario.nome = createUsuarioDto.nome;
    usuario.email = createUsuarioDto.email;
    usuario.senhaHash = createUsuarioDto.senha;

    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return this.usuarioRepository.find({
      select: ['id', 'nome', 'email', 'isActive'],
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    delete usuario['senhaHash'];
    delete usuario['senhaSalt'];
    return usuario;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.save({ id, updateUsuarioDto });
  }

  remove(id: number) {
    return this.usuarioRepository.delete({ id });
  }
}
