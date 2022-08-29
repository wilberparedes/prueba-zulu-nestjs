import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  schemaApiBody,
  clientLoginSchemaApiBody,
} from '../client/schema/client.schema';
import { Client } from '../client/entities/client.entity';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth Module')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Register new client`,
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server problems',
  })
  @ApiBody({
    schema: schemaApiBody,
  })
  registerUser(@Body() clientObject: RegisterAuthDto) {
    return this.authService.register(clientObject);
  }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Login client successfully`,
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Client does not exits',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Password is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server problems',
  })
  @ApiBody({
    schema: clientLoginSchemaApiBody,
  })
  loginUser(@Body() clientLoginObject: LoginAuthDto) {
    return this.authService.login(clientLoginObject);
  }
}
