import { IsString, MinLength } from "class-validator";
import { IsEnum } from 'class-validator';
import { UserRole } from "../entities/user-role.enum";

export class CreateUserDto {
    @IsString()
    @MinLength(1)
    name: string; // Nombre del usuario

    @IsString()
    email: string; // Correo electrónico del usuario

    @IsString()
    password: string; // Contraseña del usuario

    @IsEnum(UserRole)
    role: UserRole;

}
