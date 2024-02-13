import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'period',
})
export class PeriodPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    switch (value) {
      case 168:
        return 'أسبوع';

      case 730:
        return 'شهر';

      case 8760:
        return 'سنة';
    }
  }
}
