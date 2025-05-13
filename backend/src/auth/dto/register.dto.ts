import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsString, min, MinLength } from "class-validator";
import { UserRole } from "src/users/entities/user-role.enum";

export class RegisterDto{
    @Transform(({ value }) => value.trim()) 
    @IsString()
    @MinLength(1)
    name: string; // Nombre del usuario

    @IsEmail()
    email: string; // Correo electrónico del usuario

    @Transform(({ value }) => value.trim()) // Eliminar espacios en blanco al inicio y al final
    @IsString()
    @MinLength(6)
    password: string; // Contraseña del usuario

    @IsEnum(UserRole) // Enum para los roles de usuario
    role: UserRole; // Rol del usuario (ejemplo: 'admin', 'user', etc.)

}