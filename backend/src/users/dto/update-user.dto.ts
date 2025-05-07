import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { UserRole } from '../entities/user-role.enum';

export class UpdateUserDto {
    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string; // Nombre del usuario
    
    @IsString()
    @IsOptional()
    email?: string; // Correo electrónico del usuario
    
    @IsString()
    @IsOptional()
    password?: string; // Contraseña del usuario
    
    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}
