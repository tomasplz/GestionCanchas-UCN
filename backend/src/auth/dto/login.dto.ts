import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {

    @IsEmail()
    email: string; // Correo electrónico del usuario

    @Transform(({ value }) => value.trim()) // Eliminar espacios en blanco al inicio y al final
    @IsString()
    @MinLength(6)
    password: string; // Contraseña del usuario
}