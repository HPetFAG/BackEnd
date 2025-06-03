import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAnimalDto {

    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.'})
    nome: string;
    
    @IsNotEmpty({ message: 'A idade é obrigatória.'})
    @IsNumber({}, { message: 'A idade deve ser um número.' })
    idade: number;

    @IsString()
    @IsNotEmpty({ message: 'O sexo é obrigatório.'})
    sexo: string;

    @IsString()
    @IsNotEmpty({ message: 'A raça é obrigatória.'})
    raca: string;
    porte: number;

    @IsNumber({}, { message: 'O porte deve ser um número.' })
    @IsNotEmpty({ message: 'O porte é obrigatório.'})
    temperamento: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    historico_saude: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    necessidades_especiais: string[]; 
}
