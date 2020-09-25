export class Task {
  _id?: string;
  userId: string;
  contactId: string;
  title: string;
  deadline: Date;
  type: string;
  notes: string;
  addDate: Date;
  completed: boolean;
}
