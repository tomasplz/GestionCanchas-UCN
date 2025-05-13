import { Body, Controller, Get, Post ,UseGuards,Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService ){    }

    @Post('register')
    register(
        @Body() // Decorador para obtener el cuerpo de la solicitud
        registerDto:RegisterDto,
    ){
        return this.authService.register(registerDto); // Llama al servicio de autenticación para registrar un nuevo usuario
     }

    @Post('login')
    login(
        @Body() // Decorador para obtener el cuerpo de la solicitud
        loginDto:LoginDto, // DTO para el inicio de sesión);
        
    ){
        return this.authService.login(loginDto); // Llama al servicio de autenticación para iniciar sesión
    }
    @Get('profile')
    @UseGuards(AuthGuard) // Guard para proteger la ruta
    profile(@Req() req:Request) { // Decorador para obtener la solicitud
        return (req as any).user; // Devuelve un mensaje de perfil
    }
}
