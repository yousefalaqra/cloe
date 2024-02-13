import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


@NgModule({
  declarations: [],
  
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule
  ],

  exports: [HttpClientModule, TranslateModule, CommonModule],
})
export class TranslationModule {}



