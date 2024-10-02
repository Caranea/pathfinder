import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { CreateUserResult, CreateUserStatus } from '../types/user-register-result';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<CreateUserResult> {
    const userExists = await this.userExists(createUserDto);

    if (userExists) {
      return { message: CreateUserStatus.USER_EXISTS };
    }

    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.clerkId = createUserDto.clerkId;

    try {
      const savedUser = await this.userRepository.save(user)
      return {
        user: savedUser,
        message: CreateUserStatus.COMPLETE
      };
    } catch (e) {
      return {
        message: CreateUserStatus.USER_CREATION_FAILED
      };
    }
  }

  async userExists(createUserDto: CreateUserDto): Promise<boolean> {
    const exists = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email }
      ]
    })
    return !!exists
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
