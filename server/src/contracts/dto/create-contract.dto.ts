export class CreateContractDto {
    contractAddress: string;
    arbiter: string;
    beneficiary: string;
    depositor: string;
    approved: boolean;
    amount: number;
    date: string;
}
