import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { JoiModalComponent } from './joi-modal/joi-modal.component';


@NgModule({
  declarations: [JoiModalComponent],
  imports: [
    CommonModule,
    NzModalModule
  ],
  exports: [JoiModalComponent]
})
export class JoIModalModule { }
