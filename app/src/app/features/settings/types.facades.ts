import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeApi } from './api/type.api';
import { TypeResource } from './resources/types/type.resource';
import { TypeState } from './state/type.state';


@Injectable()
export class TypeFacade {
  constructor(private typeState: TypeState, private typeApi: TypeApi) {}
  types$: Observable<Array<TypeResource>> = this.typeState.getTypes();
  observableTypes :  Observable<any> ;

  loadTypes(): Observable<TypeResource> {
    this.observableTypes =this.typeApi.getTypes(0); 
    this.observableTypes.subscribe(e => {
      this.setTypes(e.result);});
    return this.observableTypes;
  }

  getTypesForCategoryId(categorId): Observable<Array<TypeResource>> {
    this.observableTypes =this.typeApi.getTypes(categorId); 
    this.observableTypes.subscribe(e => {
      this.setTypes(e.result);});
    return this.observableTypes;
  }

  setTypes(types: Array<TypeResource>) {
    this.typeState.setTypes(types);
  }

  addType(type:TypeResource )
  {
     this.typeApi.addType(type).subscribe(e => {
      this.typeState.addType(e.result);

    });
  }

  updateType(type:TypeResource )
  {
    this.typeApi.updateType(type).subscribe(e => {
      this.typeState.updateType(type);
  

    });
  }

  deleteType(type:TypeResource )
  {
    this.typeApi.deleteType(type.id).subscribe(e => {
      this.typeState.removeType(type.id);
    });
  }
}
