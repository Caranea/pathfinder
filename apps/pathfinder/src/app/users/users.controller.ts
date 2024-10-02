import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicApi } from '../shared/decorators/public-api.decorator';
import { CreateUserResult } from './types/user-register-result';
import { UsersService } from './services/users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @PublicApi(3, 10000)
  async registerUser(
    @Body() createUserDto: CreateUserDto
  ): Promise<CreateUserResult> {

    return await this.usersService.create(createUserDto);
  }
}
