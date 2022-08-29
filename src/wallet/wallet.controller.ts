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
import { ClientService } from '../client/client.service';
import { UpserWalletDTO } from './dto/wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { schemaWalletApiBody } from './schema/wallet.schema';
import { WalletService } from './wallet.service';

@ApiTags('Wallet Module')
@Controller('wallet')
export class WalletController {
  constructor(
    private walletService: WalletService,
    private clientService: ClientService,
  ) {}

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Get all wallets`,
    type: Wallet,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server problems',
  })
  async getWallets(@Res() res) {
    const wallets = await this.walletService.getWallets();
    return res.status(HttpStatus.OK).json({
      wallets,
    });
  }

  @Get(':walletID')
  @ApiParam({ name: 'walletID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Get wallet filter by id`,
    type: Wallet,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Format ID is not valid',
  })
  async getWalletByID(@Res() res, @Param('walletID') walletID: string) {
    const wallet = await this.walletService.getWalletByID(walletID);
    if (!wallet) throw new NotFoundException('Wallet does not exits');
    return res.status(HttpStatus.OK).json({
      wallet,
    });
  }

  @Get('user/:userID')
  @ApiParam({ name: 'userID', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Get wallet filter by user`,
    type: Wallet,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Format ID is not valid',
  })
  async getWalletByUserID(@Res() res, @Param('userID') userID: string) {
    const wallet = await this.walletService.getWalletByUserID(userID);
    if (!wallet)
      throw new NotFoundException(
        `Wallet does not exits for this user ${userID}`,
      );
    return res.status(HttpStatus.OK).json({
      wallet,
    });
  }

  @Post('recharge')
  @ApiResponse({
    status: HttpStatus.OK,
    description: `Recharge wallet of client`,
    type: Wallet,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet or user not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Server problems',
  })
  @ApiBody({
    schema: schemaWalletApiBody,
  })
  async rechargeWallet(@Res() res, @Body() rechargeWalletDTO: UpserWalletDTO) {
    const userExist = await this.clientService.getClient(
      rechargeWalletDTO.user,
    );
    if (!userExist) throw new NotFoundException('User does not exits');
    const actualBalance = await this.walletService.getWalletByUserID(
      rechargeWalletDTO.user,
    );
    const copRecharge = (actualBalance?.cop ?? 0) + rechargeWalletDTO.cop;
    const usd = Number(
      parseFloat((copRecharge / 4401.11).toString()).toFixed(2),
    );
    const wallet = await this.walletService.setRechargeMoney(
      rechargeWalletDTO.user,
      copRecharge,
      usd,
    );
    return res.status(HttpStatus.OK).json({
      wallet,
    });
  }
}
