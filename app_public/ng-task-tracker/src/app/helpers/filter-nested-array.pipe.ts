import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNestedArray'
})
export class FilterNestedArrayPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any {
    if (!items || !searchTerm) {
      return items || [];
    }

    searchTerm = searchTerm.toLowerCase();

    return items.filter(item => {
      let nameMatch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase())

      return nameMatch;
    });

  }

}
