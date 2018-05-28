import { NgModule, ModuleWithProviders } from "@angular/core";
import {Http, HttpModule} from "@angular/http";
import {TranslateService} from "./translate.service";
import {TranslatePipe} from "./translate.pipe";
export * from './translate.service';
export * from './translations';
export * from './translate.pipe';

export default {
    pipes: [TranslatePipe],
    providers: [TranslateService]
}; 

@NgModule({
    imports: [HttpModule],
    declarations: [
        TranslatePipe
    ],
    exports: [
        HttpModule, // todo remove this when removing the loader from core
        TranslatePipe
    ]
})

export class TranslateModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TranslateModule,
      providers: [TranslateService]
    };
  }
}