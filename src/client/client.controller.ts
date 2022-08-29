import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClientService } from './client.service';
import { Client } from './entities/client.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'user dont have valid token',
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
    description: 'Client does not exits',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Format ID is not valid',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'user dont have valid token',
  })
  async getClient(@Res() res, @Param('clientID') clientID: string) {
    const client = await this.clientService.getClient(clientID);
    if (!client) throw new NotFoundException('Client does not exits');
    return res.status(HttpStatus.OK).json({
      client,
    });
  }
}
