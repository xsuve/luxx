import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchContacts'
})
export class SearchContactsPipe implements PipeTransform {

  transform(contacts: any[], query: string): any[] {
    return contacts.filter(contact =>
      contact.fullName.toLowerCase().includes(query.toLowerCase())
      || contact.address.toLowerCase().includes(query.toLowerCase())
    );
  }

}
