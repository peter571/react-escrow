import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ContractDocument, Contract } from './contract.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ContractsService {
  constructor(@InjectModel('Contracts') private contractsModel: Model<ContractDocument>) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const newContract = await this.contractsModel.create(createContractDto);
    return await newContract.save();
  }
 
  async findAll(): Promise<Contract[]> {
    return await this.contractsModel.find().exec();
  }

  async findOne(id: string): Promise<Contract> {
    return await this.contractsModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateContractDto: UpdateContractDto) {
    return await this.contractsModel.findByIdAndUpdate(id, updateContractDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Contract> {
    const deletedContract = await this.contractsModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedContract;
  }
}
