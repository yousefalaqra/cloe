import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {ColumnItem} from '../../../resources/columnType';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { TypeResource } from '../../../resources/types/type.resource';
import { TypeFacade } from '../../../types.facades';
import { AddTypeComponent } from '../add-type/add-type.component';
import {TypeCategory} from '../../../enums/type-category.enum';
import { LanguageServiceService } from 'src/app/core/languageService/language-service.service';

@Component({
  selector: 'type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.scss']
})
export class TypeListComponent implements OnInit, OnDestroy {
  isArabic: boolean;
  translateData;
  size=6;
  typeCategoryId = 0;
  typeItems$: Observable<Array<TypeResource>>;
  loadTypeItemsSubscirption$: Subscription;
  typeItem : TypeResource[] =[];
  listOfColumns: ColumnItem[] = [];

  constructor(private typesFacade: TypeFacade, private modal: NzModalService, 
    private viewContainerRef: ViewContainerRef,public langugaeService: LanguageServiceService)
    {
      langugaeService.isArabic.subscribe(e => { this.isArabic = e });
      langugaeService.data.subscribe(e => { this.translateData = e ;});
    }
  ngOnInit() : void {

    this.langugaeService.isArabic.subscribe(e => { this.isArabic = e });
    this.langugaeService.data.subscribe(e => { this.translateData = e ;
      this.listOfColumns= [

        {
          name: this.translateData.typeCol,
          sortOrder: null,
          sortFn: (a: TypeResource, b: TypeResource) => a.type.localeCompare(b.type),
          sortDirections: ['ascend', 'descend', null],
        }
      ];
    });

    this.loadTypeItemsSubscirption$ = this.typesFacade.loadTypes().subscribe(e=> {
      this.typesFacade.types$.subscribe(types => {this.typeItem  = types;
        this.typeItem.sort( function  (firstEl, secondEl)   
             { return secondEl.id - firstEl.id;}
            );
      this.typeItem.forEach(element => {
        element.action = false;
      });
      });
    });
    
    

 
}
  getNameTypeCategoryId(){
    if(this.typeCategoryId === 0)
      return this.translateData.foodItem;
    if(this.typeCategoryId ===1)
      return this.translateData.meal;
    if(this.typeCategoryId ===2)
      return this.translateData.diet;   
  }
  filterbyTypeCategory(categoryId){
    this.typeCategoryId =categoryId;
    this.typesFacade.getTypesForCategoryId(categoryId);
  }
  addNewType(): void {
    const modal = this.modal.create({
      nzTitle: this.translateData.addType,
      nzDirection : this.isArabic ? "rtl" : "ltr",
      nzClassName: this.isArabic? 'ArabicFont' :'EnglishFont',
      nzContent: AddTypeComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        typeValue : null,
        editMode:false
      },
      nzFooter: [
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterClose.subscribe(result => {
      this.typeCategoryId= result.id;
      this.typesFacade.getTypesForCategoryId(result.id);}); 
  }
  editType(type:TypeResource): void { 
    const modal = this.modal.create({
      nzTitle: this.translateData.editType,
      nzDirection : this.isArabic ? "rtl" : "ltr",
      nzClassName: this.isArabic? 'ArabicFont' :'EnglishFont',
      nzContent: AddTypeComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
       typeValue : type,
        editMode:true
      },
      nzFooter: [
      ]
    });
    const instance = modal.getContentComponent();
    console.log(instance);
    modal.afterClose.subscribe(result => {
      this.typeCategoryId= result.id;
      this.typesFacade.getTypesForCategoryId(result.id);}); 
  }

  ngOnDestroy(): void {
    this.loadTypeItemsSubscirption$.unsubscribe();
  }

  showDeleteConfirm(type:TypeResource): void {
    this.modal.confirm({
      nzTitle: this.translateData.confirmDelete,
      nzClassName: this.isArabic? 'ArabicFont' :'EnglishFont',
      nzDirection : this.isArabic ? "rtl" : "ltr",
    //  nzContent: '<b style="color: red;"></b>',
      nzOkText: this.translateData.yes,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => { this.typesFacade.deleteType(type); },
      nzCancelText: this.translateData.no,
      nzOnCancel: () => this.modal.closeAll()
    });
  }
  showSetting(event){
    var index  =event.currentTarget.attributes[1].nodeValue;   
    this.typeItem[Number(index)].action = true;
  }
  turnOffAction(event){
    var index  =event.currentTarget.attributes[1].nodeValue;   
    this.typeItem[Number(index)].action = false;
  }

}
