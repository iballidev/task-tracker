import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    // Create a Date object from the provided string
    const date = new Date(value);

    // Use the DatePipe to format the date in 'yyyy-MM-dd' format
    const formattedDate = new DatePipe('en-US').transform(date, 'yyyy-MM-dd');

    return formattedDate || value; // Return the formatted date or the original value if formatting fails
  }

}
