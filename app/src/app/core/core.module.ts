import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BhHeader } from './components/bh-header/bh-header.component';
import { RouterModule } from '@angular/router';
import { BhLogoComponent } from './components/bh-logo/bh-logo.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AppState } from './state/app.state';
import { AppFacade } from './app.facade';
import { JoIFormModule } from '../shared/joI/src/form/joi-form.module';
import { JoIAvatarModule } from '../shared/joI/src/avatar/avatar.module';
import { HeaderAdminComponent } from './components/bh-header/header-admin/header-admin.component';
import { HeaderLanguageComponent } from './components/bh-header/header-language/header-language.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { MetaHeaderComponent } from './components/meta-header/meta-header.component';
import { AppApi } from './api/app.api';
import { TranslationModule } from '../shared/translation/translation.module';
import { AuthGuardService } from './services/auth-guard.service';
import { httpInterceptorProviders } from './api';
import { HttpClientModule } from '@angular/common/http';
import { JoIIconsModule } from '../shared/joI/src/icons/joi-icons.module';

@NgModule({
  declarations: [
    BhHeader,
    BhLogoComponent,
    NavMenuComponent,
    HeaderAdminComponent,
    HeaderLanguageComponent,
    MetaHeaderComponent,
  ],
  imports: [
    RouterModule,
    JoIFormModule,
    JoIAvatarModule,
    NzDropDownModule,
    NzIconModule,
    TranslationModule,
    HttpClientModule,
    JoIIconsModule
  ],
  exports: [BhHeader, NavMenuComponent, MetaHeaderComponent],
  providers: [
    AppState,
    AppFacade,
    AppApi,
    AuthGuardService,
    httpInterceptorProviders,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
