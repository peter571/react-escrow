import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Contract } from './contract.schema';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  async create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
    return this.contractsService.create(createContractDto);
  }

  @Get()
  async findAll(): Promise<Contract[]> {
    return this.contractsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contract> {
    return this.contractsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto): Promise<Contract> {
    return this.contractsService.update(id, updateContractDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Contract> {
    return this.contractsService.remove(id);
  }
}
