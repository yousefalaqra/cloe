import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'joi-modal',
  templateUrl: './joi-modal.component.html',
  styleUrls: ['./joi-modal.component.scss'],
})
export class JoiModalComponent implements OnInit, OnChanges{
  @Input('show') isVisible: boolean = false;
  isOkLoading = false;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.isVisible = changes.isVisible.currentValue;
    console.log('this.isVisible: ', this.isVisible);
  }


  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
