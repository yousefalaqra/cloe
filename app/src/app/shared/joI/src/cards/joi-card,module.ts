import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './cards.component';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent],
  imports: [CommonModule]
})
export class CardsModule {}
