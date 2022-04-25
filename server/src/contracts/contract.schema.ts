import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContractDocument = Contract & Document;

@Schema()
export class Contract {
  @Prop({ required: true })
  contractAddress: string;

  @Prop({ required: true })
  arbiter: string;

  @Prop({ required: true })
  beneficiary: string;

  @Prop({ required: true })
  depositor: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  approved: boolean;

  @Prop({ required: true })
  date: string;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);