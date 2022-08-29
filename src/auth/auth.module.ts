import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Client } from '../client/entities/client.entity';
import { ClientSchema } from '../client/schema/client.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Client.name,
        schema: ClientSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
