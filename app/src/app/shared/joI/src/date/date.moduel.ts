import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArDatePipe } from './pipes/ar-date.pipe';

@NgModule({
  declarations: [ArDatePipe],
  imports: [CommonModule],
  exports: [ArDatePipe]
})
export class DateModule {}
