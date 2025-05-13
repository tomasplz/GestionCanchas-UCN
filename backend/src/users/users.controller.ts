import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {// Este controlador maneja las rutas relacionadas con los usuarios
  constructor(private readonly usersService: UsersService) {}//inicializa el servicio de usuarios

  @Post()// Crear un nuevo usuario
  // @UseGuards(JwtAuthGuard) // Proteger la ruta con el guardia de autenticación JWT
  create(@Body() createUserDto: CreateUserDto) {// Recibe el DTO de creación de usuario desde el cuerpo de la solicitud
    return this.usersService.create(createUserDto);// Llama al servicio de usuarios para crear un nuevo usuario
  }

  @Get()// Obtener todos los usuarios
  findAll() {// Llama al servicio de usuarios para obtener todos los usuarios
    return this.usersService.findAll();// Devuelve la lista de usuarios
  }

  @Get(':id')// Obtener un usuario por ID
  findOne(@Param('id') id: number) {// Recibe el ID del usuario desde los parámetros de la solicitud
    return this.usersService.findOne(id);// Llama al servicio de usuarios para obtener el usuario por ID
  }

  @Patch(':id')// Actualizar un usuario por ID
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {// Recibe el ID del usuario y el DTO de actualización desde la solicitud
    return this.usersService.update(id, updateUserDto);// Llama al servicio de usuarios para actualizar el usuario
  }

  @Delete(':id')// Eliminar un usuario por ID
  remove(@Param('id') id: number) {// Recibe el ID del usuario desde los parámetros de la solicitud
    return this.usersService.remove(id);// Llama al servicio de usuarios para eliminar el usuario
  }
}
