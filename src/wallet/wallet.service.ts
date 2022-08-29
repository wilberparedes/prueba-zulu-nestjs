import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet, WalletDocument } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name)
    private readonly walletModel: Model<WalletDocument>,
  ) {}

  async getWallets(): Promise<Wallet[]> {
    return await this.walletModel.find().populate(['user']);
  }

  async getWalletByID(walletID: string): Promise<Wallet> {
    return this.walletModel.findById(walletID).populate(['user']);
  }

  async getWalletByUserID(userID: string): Promise<Wallet> {
    return this.walletModel
      .findOne({
        user: userID,
      })
      .populate(['user']);
  }

  async setRechargeMoney(userID: string, cop: number, usd: number) {
    return await this.walletModel
      .findOneAndUpdate(
        {
          user: userID,
        },
        { $set: { cop, usd } },
        {
          new: true,
          upsert: true,
        },
      )
      .populate(['user']);
  }
}
