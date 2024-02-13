import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { LanguageServiceService } from 'src/app/core/languageService/language-service.service';
import { TypeResource } from '../../../resources/types/type.resource';
import { TypeFacade } from '../../../types.facades';

@Component({
  selector: 'add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {
  isArabic: boolean;
  translateData;
  @Input() editMode: boolean;
  @Input() typeValue: TypeResource;
    typeForm: FormGroup;
    @ViewChild("typeName") myInputField: ElementRef;

  typeCategoryId = 0;
  typeItem: TypeResource[] = [];

  constructor(private modal: NzModalRef, private modalService: NzModalService, private fb: FormBuilder, private typeFacade: TypeFacade, public langugaeService: LanguageServiceService) {
    this.langugaeService.isArabic.subscribe(e => { this.isArabic = e });
    this.langugaeService.data.subscribe(e => { this.translateData = e });
  }
    ngAfterViewInit() {
        this.myInputField.nativeElement.focus();
    }

  CreateForm() {
    this.typeForm = this.fb.group({
      type: ['', []],

    });
  }
  resetForm() {
    this.typeForm.reset();
  }
  getNameTypeCategoryId() {
    if (this.typeCategoryId === 0)
      return this.translateData.foodItem;
    if (this.typeCategoryId === 1)
      return this.translateData.meal;
    if (this.typeCategoryId === 2)
      return this.translateData.diet;
  }
  setTypeCategory(categoryId) {
    this.typeCategoryId = categoryId;

  }
  ngOnInit(): void {
    this.langugaeService.isArabic.subscribe(e => { this.isArabic = e });
    this.langugaeService.data.subscribe(e => { this.translateData = e });
    this.typeFacade.types$.subscribe(types => {
      this.typeItem = types;

    });
    this.CreateForm();
    this.resetForm();

    if (this.editMode) {
      this.typeCategoryId = this.typeValue.typeCategory;
      this.typeForm.patchValue({
        type: this.typeValue.type,

      })
    }
  }

  submitForm(form: any): void {
    for (const i in this.typeForm.controls) {
      this.typeForm.controls[i].markAsDirty();
      this.typeForm.controls[i].updateValueAndValidity();
    }



    if (this.editMode) {
      var nameExist = this.typeItem.find(e => e.type === form.type && e.type !== this.typeValue.type);
      if (nameExist != null && nameExist != undefined) {
        this.showError();
      } else {
        const type: TypeResource = <TypeResource>{
          //fill 
          id: this.typeValue.id,
          type: form.type,
          typeCategory: this.typeCategoryId,
          action: false
        }
        this.typeFacade.updateType(type);
        this.destroyModal(this.typeCategoryId);
      }
    } else {
      var nameExist =this.typeItem.find(e => e.type ===form.type );
      if (nameExist != null&& nameExist != undefined) {
        this.showError();
      } else {
        const type: TypeResource = <TypeResource>{
          //fill
          id: 0,
          type: form.type,
          typeCategory: this.typeCategoryId,
          action: false
        }
        this.typeFacade.addType(type);
        this.destroyModal(this.typeCategoryId);
      }
    }
  }

  destroyModal(id: number): void {
    this.modal.destroy({ 'id': id });
  }
  showError(): void {
    this.modalService.error({
      nzTitle: this.translateData.errorMessage,
      nzContent: '<div class="red" >' + this.translateData.typeCol + " " + this.translateData.isDuplicate + '</div>',
      nzClassName: this.isArabic ? 'ArabicFont' : 'EnglishFont',
      nzDirection: this.isArabic ? "rtl" : "ltr",
      nzOkText: this.translateData.yes
    });
  }

}
