import { Component, OnInit } from '@angular/core';
import { LanguageServiceService } from 'src/app/core/languageService/language-service.service';

@Component({
  selector: 'settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainer implements OnInit {



  isArabic: boolean;
  translateData;
  constructor(
      public langugaeService: LanguageServiceService
  ) {
      langugaeService.isArabic.subscribe(e => { this.isArabic = e });
      langugaeService.data.subscribe(e => { this.translateData = e ;  console.log(this.translateData);});
  }
  ngOnInit() {
      this.langugaeService.isArabic.subscribe(e => { this.isArabic = e });
      this.langugaeService.data.subscribe(e => { this.translateData = e });
  }

}
