import {MatIconModule} from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { SearchIconComponent } from './search-icon/search-icon.component';
import { LoadingAppleIcon } from './loading-apple/loading-apple.component';
import { MenuIcon } from './menu/menu.component';
import { ArrowDownIcon } from './arrow-down-icon/arrow-down-icon.component';



@NgModule({
  declarations: [SearchIconComponent, LoadingAppleIcon, MenuIcon, ArrowDownIcon],
  imports: [
    MatIconModule
  ],
  exports: [SearchIconComponent, LoadingAppleIcon, MenuIcon, ArrowDownIcon]
})
export class JoIIconsModule { }
