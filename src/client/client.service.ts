import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientDocument, Client } from './entities/client.entity';
import { UpsertClientDTO } from './dto/client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name)
    private readonly clientModel: Model<ClientDocument>,
  ) {}

  async getClients(): Promise<Client[]> {
    return await this.clientModel.find();
  }

  async getClient(clientID: string): Promise<Client> {
    return this.clientModel.findById(clientID);
  }

  async createClient(
    createClientDTO: UpsertClientDTO,
  ): Promise<ClientDocument> {
    const client = await new this.clientModel(createClientDTO).save();
    return client;
  }

  async deleteClient(clientID: string): Promise<Client> {
    return await this.clientModel.findByIdAndDelete(clientID);
  }

  async updateClient(
    clientID: string,
    updateClientDTO: UpsertClientDTO,
  ): Promise<Client> {
    return await this.clientModel.findByIdAndUpdate(clientID, updateClientDTO, {
      new: true,
    });
  }
}
