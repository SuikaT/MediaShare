import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseSize',
  standalone: true,
})
export class ParseSizePipe implements PipeTransform {
  capacity = ['Ko', 'Mo', 'Go', 'To'];

  transform(value: number): string {
    const magnitude = this.capacity.find(() => {
      value = value / 1000;

      if (value < 1000) {
        return true;
      }

      return false;
    });

    return Math.round((value + Number.EPSILON) * 100) / 100 + ' ' + magnitude;
  }
}
