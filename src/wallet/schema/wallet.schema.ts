import { SchemaFactory } from '@nestjs/mongoose';
import { Wallet } from '../entities/wallet.entity';

export const schemaWalletApiBody = {
  type: 'object',
  properties: {
    user: {
      type: 'string',
    },
    cop: {
      type: 'number',
    },
  },
};

export const WalletSchema = SchemaFactory.createForClass(Wallet);
