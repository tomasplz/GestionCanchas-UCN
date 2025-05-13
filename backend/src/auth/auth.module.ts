import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstanst } from './constants/jwt.constants'; // Importar constantes de JWT

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true, // Hacer que el módulo JWT esté disponible en toda la aplicación  
      secret: jwtConstanst.secret,// Clave secreta para firmar el token  
      signOptions: { expiresIn: '1d' }, // Opciones de firma del token (tiempo de expiración)
    })
  ], // Importar el servicio de usuarios
  controllers: [AuthController], // Controlador de autenticación
  providers: [AuthService] // Servicio de autenticación
})
export class AuthModule {}
