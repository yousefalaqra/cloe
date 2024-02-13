import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from 'src/app/core/api';



@NgModule({
  declarations: [],
  providers: [
    httpInterceptorProviders
  ],
  imports: [
    CommonModule
  ]
})
export class FinancialModule { }
