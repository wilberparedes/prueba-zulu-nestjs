import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';
import { UpsertClientDTO } from './dto/client.dto';
import { Client } from './entities/client.entity';
import { schemaApiBody } from './schema/client.schema';

@ApiTags('Client Module')
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Get all clients`,
    type: Client,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server problems',
  })
  async getClients(@Res() res) {
    const clients = await this.clientService.getClients();
    return res.status(HttpStatus.OK).json({
      clients,
    });
  }

  @Get(':clientID')
  @ApiParam({ name: 'clientID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Get client filter by id`,
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Client not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Format ID is not valid',
  })
  async getClient(@Res() res, @Param('clientID') clientID: string) {
    const client = await this.clientService.getClient(clientID);
    if (!client) throw new NotFoundException('Client does not exits');
    return res.status(HttpStatus.OK).json({
      client,
    });
  }

  @Post('create')
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Create new client`,
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server problems',
  })
  @ApiBody({
    schema: schemaApiBody,
  })
  async createClient(@Res() res, @Body() createClientDTO: UpsertClientDTO) {
    const client = await this.clientService.createClient(createClientDTO);
    return res.status(HttpStatus.OK).json({
      client,
    });
  }
}
