import { Document, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Wallet {
  @ApiProperty({ format: 'uuid' })
  _id: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
  @ApiProperty()
  user;

  @Prop({ required: true })
  @ApiProperty()
  usd: number;

  @Prop({ required: true })
  @ApiProperty()
  cop: number;
}
export type WalletDocument = Wallet & Document;
