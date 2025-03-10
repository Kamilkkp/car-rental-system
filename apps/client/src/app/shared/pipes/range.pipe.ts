import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range',
  standalone: true
})
export class RangePipe implements PipeTransform {
  transform(totalPages: number): number[] {
    return Array.from({length: totalPages}, (_, i) => i + 1);
  }
}