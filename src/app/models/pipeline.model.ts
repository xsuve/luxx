import { Contact } from './contact.model';

export class Pipeline {
  _id?: string;
  userId: string;
  title: string;
  contacts: Contact[];
}
