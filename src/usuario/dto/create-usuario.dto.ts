import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUsuarioDto {
  @IsString({ message: 'O nome precisa ser uma string' })
  @IsNotEmpty({ message: 'É necessário informar o nome' })
  nome: string;

  @IsString({ message: 'O email precisa ser uma string' })
  @IsNotEmpty({ message: 'É necessário informar o e-mail' })
  email: string;

  @IsString({ message: 'A senha precisa ser uma string' })
  @IsNotEmpty({ message: 'É necessário informar a senha' })
  senha: string;
}
