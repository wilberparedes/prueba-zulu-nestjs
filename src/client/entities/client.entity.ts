import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Client {
  @ApiProperty({ format: 'uuid' })
  _id: string;

  @Prop({ required: true })
  @ApiProperty()
  email: string;

  @Prop({ required: true })
  @ApiProperty()
  password: string;

  @Prop({ required: true })
  @ApiProperty()
  fullName: string;

  @Prop({ required: true })
  @ApiProperty()
  cedula: string;

  @Prop({ required: true })
  @ApiProperty()
  direccional: string;
}
export type ClientDocument = Client & Document;
