import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ClientModule,
    MongooseModule.forRoot('mongodb://localhost/prueba-zulu-nestjs'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
