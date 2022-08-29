import {
  NotFoundException,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '../client/entities/client.entity';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
    private jwtService: JwtService,
  ) {}

  async register(clientObject: RegisterAuthDto) {
    const { password } = clientObject; //TODO 1234
    const plainToHash = await hash(password, 10); //TODO $2b$10$gasmCZfML8s2ETvYUbcBT.RNC97awMsorZMiKN2NTG0KimDef4/qW
    clientObject = { ...clientObject, password: plainToHash };
    return this.clientModel.create(clientObject);
  }

  async login(clientLoginObject: LoginAuthDto) {
    const { email, password } = clientLoginObject;
    const findClient = await this.clientModel.findOne({ email });
    if (!findClient) throw new NotFoundException('Client does not exits');

    const checkPassword = await compare(password, findClient.password);
    if (!checkPassword)
      throw new HttpException('Password is incorrect', HttpStatus.FORBIDDEN);

    const payload = { id: findClient._id, fullName: findClient.fullName };
    const token = this.jwtService.sign(payload);
    const data = {
      client: findClient,
      token,
    };
    return data;
  }
}
