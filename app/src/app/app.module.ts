import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import en from '@angular/common/locales/en';
import { NZ_I18N, ar_EG, en_US } from 'ng-zorro-antd/i18n';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(ar);
registerLocaleData(en);
import { BrowserModule } from '@angular/platform-browser';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BhAppComponent } from './bh-app/bh-app.component';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProviders } from './core/api';
@NgModule({
  declarations: [AppComponent, BhAppComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    NzButtonModule,

    NzTableModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          /** keep the same with angular.json/i18n/locales configuration **/
          case 'ae':
            return ar_EG;
          default:
            return ar_EG;
        }
      },
      deps: [LOCALE_ID],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
