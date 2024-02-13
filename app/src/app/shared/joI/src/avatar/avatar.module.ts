import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvFWomanComponent } from './av-f-woman/av-f-woman.component';
import { AvEWomanComponent } from './av-e-woman/av-e-woman.component';
import { AvAManComponent } from './av-a-man/av-a-man.component';
import { AvAWomanComponent } from './av-a-woman/av-a-woman.component';
import { AvBManComponent } from './av-b-man/av-b-man.component';
import { AvBWomanComponent } from './av-b-woman/av-b-woman.component';
import { AvCManComponent } from './av-c-man/av-c-man.component';
import { AvCWomanComponent } from './av-c-woman/av-c-woman.component';
import { AvDManComponent } from './av-d-man/av-d-man.component';
import { AvDWomanComponent } from './av-d-woman/av-d-woman.component';
import { AvEManComponent } from './av-e-man/av-e-man.component';

@NgModule({
  declarations: [
    AvFWomanComponent,
    AvEWomanComponent,
    AvEManComponent,
    AvDWomanComponent,
    AvDManComponent,
    AvCWomanComponent,
    AvCManComponent,
    AvBWomanComponent,
    AvBManComponent,
    AvAWomanComponent,
    AvAManComponent,
  ],
  imports: [CommonModule],
  exports: [
    AvFWomanComponent,
    AvEWomanComponent,
    AvEManComponent,
    AvDWomanComponent,
    AvDManComponent,
    AvCWomanComponent,
    AvCManComponent,
    AvBWomanComponent,
    AvBManComponent,
    AvAWomanComponent,
    AvAManComponent,
  ],
})
export class JoIAvatarModule {}
