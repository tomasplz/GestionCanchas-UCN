import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) //inyectar el repositorio de usuario
    //el repositorio es una clase que se encarga de interactuar con la base de datos
    private readonly userRepository: Repository<User>, 
  ) {}

  async create(createUserDto: CreateUserDto) { //crear un nuevo usuario
    //el createUserDto es un objeto que contiene los datos del usuario a crear
    return await this.userRepository.save(createUserDto); //guardar el usuario en la base de datos
  }

  async findAll() {//buscar todos los usuarios
    //el find() devuelve todos los usuarios de la base de datos
    return await this.userRepository.find();
  }

  findOne(id: number) {//buscar un usuario por id
    //el id es unico por lo que no se puede repetir
    return `This action returns a #${id} user`;
  }
  findOneByEmail(email: string) { //buscar un usuario por email
    //el email es unico por lo que no se puede repetir
    return  this.userRepository.findOneBy({email}); //buscar el usuario por email en la base de datos
  }

    async update(id: number, updateUserDto: UpdateUserDto) {//actualizar un usuario por id
    //el id es unico por lo que no se puede repetir
    return await this.userRepository.update(id, updateUserDto); //actualizar el usuario en la base de datos (se le pasa el id y el dto)
  }

  async remove(id: number) {//eliminar un usuario por id
    //el id es unico por lo que no se puede repetir
    return await this.userRepository.softDelete(id); //eliminar el usuario de la base de datos (se le pasa el id)
    //return await this.useraRepository.softRemove(id); //eliminar el usuario de la base de datos (se le pasa ña instancia del usuario)
  }
}
