import { SchemaFactory } from '@nestjs/mongoose';
import { Client } from '../entities/client.entity';

export const schemaApiBody = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    fullName: {
      type: 'string',
    },
    cedula: {
      type: 'string',
    },
    direccional: {
      type: 'string',
    },
  },
};

export const ClientSchema = SchemaFactory.createForClass(Client);
