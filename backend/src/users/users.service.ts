import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto); //guardar el usuario en la base de datos
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  findOneByEmail(email: string) {
    return  this.userRepository.findOneBy({email}); //buscar el usuario por email en la base de datos
  }

    async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto); //actualizar el usuario en la base de datos (se le pasa el id y el dto)
  }

  async remove(id: number) {
    return await this.userRepository.softDelete(id); //eliminar el usuario de la base de datos (se le pasa el id)
    //return await this.useraRepository.softRemove(id); //eliminar el usuario de la base de datos (se le pasa ña instancia del usuario)
  }
}
