import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unixTimestampTime',
})
export class UnixTimestampTimePipe extends DatePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const isoDate = new Date(value * 1000).toISOString();

    return super.transform(isoDate);
  }
}
