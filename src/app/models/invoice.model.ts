export class Invoice {
  _id?: string;
  userId: string;
  contactId: string;
  number: number;
  value: number;
  paid: boolean;
  dueDate: Date;
  addDate: Date;
}
