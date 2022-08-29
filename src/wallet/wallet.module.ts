import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from '../client/client.module';
import { Wallet } from './entities/wallet.entity';
import { WalletSchema } from './schema/wallet.schema';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
    ClientModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
