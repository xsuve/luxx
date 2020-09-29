export class PipelineContact {
  contactId: string;
  value: number;
}


export class Pipeline {
  _id?: string;
  userId: string;
  title: string;
  contacts: PipelineContact[];
}
