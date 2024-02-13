import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PresenterComponent } from './presenter/presenter.component';

@NgModule({
  declarations: [PresenterComponent],
  imports: [CommonModule],
  exports: [PresenterComponent]
})
export class DataPresenterModule {}
