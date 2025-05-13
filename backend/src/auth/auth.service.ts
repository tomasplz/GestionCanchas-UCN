import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

import * as bcryptjs from 'bcryptjs'; // Importar bcrypt para encriptar contraseñas
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService:UsersService, // Inyectar el servicio de autenticación
        private readonly jwtService:JwtService, // Inyectar el servicio de JWT
    
    ) { } 

    async register(registerDto:RegisterDto) { // Método para registrar un nuevo usuario
        const user= await this.usersService.findOneByEmail(registerDto.email); // Buscar el usuario por email
        if(user) { // Si el usuario ya existe
            throw new BadRequestException('User already exists'); // Lanzar un error
        }
        const passwordHash = await bcryptjs.hash(registerDto.password, 10); // Encriptar la contraseña
        const newUser = {
            ...registerDto,// Desestructurar el objeto registerDto
            password: passwordHash, // reemplazar la contraseña por la encriptada
          };
        return await this.usersService.create(newUser); // Llama al servicio de usuarios para crear un nuevo usuario
    }
    async login(loginDto:LoginDto){ // Método para iniciar sesión
        const user= await this.usersService.findOneByEmail(loginDto.email);
        if(!user) { // Si el usuario no existe
            throw new UnauthorizedException('email not found'); // Lanzar un error
        }
        const isPassword = await bcryptjs.compare(loginDto.password, user.password); // Comparar la contraseña
        if(!isPassword) { // Si la contraseña no coincide
            throw new UnauthorizedException('password not found'); // Lanzar un error
        }
        const payload = {email:user.email}; // Email del usuario

        const token = this.jwtService.sign(payload); // Firmar el token

        return {
            token,
            user ,
        };
    }
}
