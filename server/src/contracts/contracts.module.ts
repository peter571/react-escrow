import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractSchema } from './contract.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Contracts', schema: ContractSchema }])],
  controllers: [ContractsController],
  providers: [ContractsService]
})
export class ContractsModule {}
