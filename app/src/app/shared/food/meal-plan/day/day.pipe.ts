import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'day',
})
export class DayPipe implements PipeTransform {
  transform(value: number, ...args: any[]) {
    switch (value) {
      case 0:
        return 'كل يوم';
      case 1:
        return 'السبت';
      case 2:
        return 'الأحد';
      case 3:
        return 'الإثنين';
      case 4:
        return 'الثلاثاء';
      case 5:
        return 'الأربعاء';
      case 6:
        return 'الخميس';
      case 7:
        return 'الجمعة';
    }
  }
}
