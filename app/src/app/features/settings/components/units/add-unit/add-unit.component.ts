import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitResource } from '../../../resources/unit/unit.resource';
import { UnitFacade } from '../../../unit.facade';
import { LanguageServiceService } from 'src/app/core/languageService/language-service.service';

@Component({
  selector: 'add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss']
})
export class AddUnitComponent implements OnInit {
  @Input() editMode: boolean;
  @Input() unitValue: UnitResource;
  unitForm: FormGroup;
  isArabic: boolean;
  Items:UnitResource[]=[];
    translateData;
    @ViewChild("typeName") myInputField: ElementRef;

  constructor(private modal: NzModalRef, private modalService: NzModalService, private fb: FormBuilder, private unitFacade: UnitFacade,
    public langugaeService: LanguageServiceService) {
    langugaeService.isArabic.subscribe(e => { this.isArabic = e });
    langugaeService.data.subscribe(e => { this.translateData = e ;});
  }
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus();
    }
  CreateForm() {
    this.unitForm = this.fb.group({
      gramsRatio: ['', [Validators.required]],
      code: [''],
      isLiquid:[false],
      required: [false]
    });
          this.unitForm.patchValue(
        {isLiquid : false}
        );
  }
  resetForm() {
    this.unitForm.reset();
    this.unitForm.patchValue(
      {isLiquid : false}
      );
  }

  ngOnInit(): void {
    this.langugaeService.isArabic.subscribe(e => { this.isArabic = e });
    this.langugaeService.data.subscribe(e => { this.translateData = e });
    this.unitFacade.units$.subscribe(units => {
      this.Items = units;

    });
    this.CreateForm();
    this.resetForm();

    if (this.editMode) {
      this.unitForm.patchValue({
        code: this.unitValue.code,
        gramsRatio: this.unitValue.gramsRatio,
        isLiquid:this.unitValue.isLiquid,
      
      })
    }
  }

  submitForm(form: any): void {
    for (const i in this.unitForm.controls) {
      this.unitForm.controls[i].markAsDirty();
      this.unitForm.controls[i].updateValueAndValidity();
    }


    if (this.editMode) {
      var nameExist = this.Items.find(e => e.code === form.code && e.code !== this.unitValue.code);
      if (nameExist != null && nameExist != undefined) {
        this.showError();
      } else {
      const unit: UnitResource = <UnitResource>{
        //fill 
        id: this.unitValue.id,
        code: form.code,
        gramsRatio: form.gramsRatio,
        isLiquid: form.isLiquid,
        action : false
      }
      this.unitFacade.updateUnit(unit);
      this.destroyModal();
    }} else {
      var nameExist = this.Items.find(e => e.code === form.code );
      if (nameExist != null && nameExist != undefined) {
        this.showError();
      } else {
      const unit: UnitResource = <UnitResource>{
        //fill
        id: 0,
        code: form.code,
        gramsRatio: form.gramsRatio,
        isLiquid: form.isLiquid,
        action : false
      }
      this.unitFacade.addUnit(unit);
      this.destroyModal();
    }}
  }

  destroyModal(): void {
    this.modal.destroy();
  }
  showError(): void {
    this.modalService.error({
      nzTitle: this.translateData.errorMessage,
      nzContent: '<div class="red" >' + this.translateData.unitColCode + " " + this.translateData.isDuplicate + '</div>',
      nzClassName: this.isArabic ? 'ArabicFont' : 'EnglishFont',
      nzDirection: this.isArabic ? "rtl" : "ltr",
      nzOkText: this.translateData.yes
    });
  }
}
