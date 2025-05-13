import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importar el módulo TypeOrmModule y el repositorio de usuario
  controllers: [UsersController],// Controlador de usuarios
  providers: [UsersService],// Servicio de usuarios
  exports: [UsersService], // Exportar el servicio de usuarios para que pueda ser utilizado en otros módulos
})
export class UsersModule {}
