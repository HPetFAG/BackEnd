import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  // Aceita CPF ou CNPJ simples (sem formatação). Pode ajustar regex conforme quiser.
  @IsString()
  @IsNotEmpty({ message: 'O documento é obrigatório.' })
  @Matches(/^\d{11}$|^\d{14}$/, {
    message: 'O documento deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido.',
  })
  document: string;

  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @Length(10, 15, { message: 'O telefone deve ter entre 10 e 15 caracteres.' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @Length(6, 100, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}
