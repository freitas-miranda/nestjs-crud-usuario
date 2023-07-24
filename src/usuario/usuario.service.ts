import { pbkdf2Sync, randomBytes } from 'node:crypto';
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
    const { nome, email, senha } = createUsuarioDto;
    const { hash, salt } = this.gerarSenha(senha);

    const usuario = new Usuario();
    usuario.nome = nome;
    usuario.email = email;
    usuario.senhaHash = hash;
    usuario.senhaSalt = salt;

    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return this.usuarioRepository.find({
      select: ['id', 'nome', 'email', 'isActive'],
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new Error('Usuário não encontrado com id: ' + id);

    delete usuario['senhaHash'];
    delete usuario['senhaSalt'];
    return usuario;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioRepository.save({ id, ...updateUsuarioDto });
  }

  remove(id: number) {
    return this.usuarioRepository.delete({ id });
  }

  gerarSenha(senhaAberta: string, salt?: string) {
    // Gera um salt aleatório de 20 bytes se não for informado
    const generatedSalt = salt || randomBytes(20).toString('hex');

    // Define o número de iterações para fortalecer o algoritmo
    const iterations = 10000;

    // Define o tamanho da chave gerada
    const keyLength = 64;

    // Aplica a função PBKDF2 para derivar a senha com o salt
    const hashedPassword = pbkdf2Sync(
      senhaAberta,
      generatedSalt,
      iterations,
      keyLength,
      'sha512',
    ).toString('hex');

    return {
      hash: hashedPassword,
      salt: generatedSalt,
    };
  }
}
