import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAnimalDto {

    @IsString()
    @IsNotEmpty({ message: 'O nome é obrigatório.'})
    name: string;
    
    @IsNotEmpty({ message: 'A idade é obrigatória.'})
    @IsNumber({}, { message: 'A idade deve ser um número.' })
    age: number;

    @IsString()
    @IsNotEmpty({ message: 'O sexo é obrigatório.'})
    sex: string;

    @IsString()
    @IsNotEmpty({ message: 'A raça é obrigatória.'})
    race: string;

    @IsNumber({}, { message: 'O porte deve ser um número.' })
    @IsNotEmpty({ message: 'O porte é obrigatório.'})
    size: number;

    @IsNumber({}, { message: 'O porte deve ser um número.' })
    @IsNotEmpty({ message: 'O porte é obrigatório.'})
    temperament: string;

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    historical_health: string[];

    @IsArray()
    @IsOptional()
    @IsString({ each: true })
    special_needs: string[]; 
}
