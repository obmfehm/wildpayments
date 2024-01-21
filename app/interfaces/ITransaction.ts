export default interface ITransaction {
  id: number;
  amount: number;
  currency: string;
  receiver: string;
  note?: string;
  createdAt: string;
  customerId: string;
  customerName: string;
}
