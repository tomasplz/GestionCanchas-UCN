import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    name: string; // Nombre del usuario

    @IsString()
    email: string; // Correo electrónico del usuario

    @IsString()
    password: string; // Contraseña del usuario

}
