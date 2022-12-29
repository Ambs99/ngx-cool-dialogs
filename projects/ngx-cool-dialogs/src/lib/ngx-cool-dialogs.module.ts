import { NGX_COOL_DIALOGS_CONFIG } from './ngx-cool-dialogs.config';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCoolDialog } from './ngx-cool-dialogs';
import { NgxCoolDialogsService } from './ngx-cool-dialogs.service';
import { NgxCoolDialogsGlobalConfig } from './ngx-cool-dialogs.config';

@NgModule({
  imports: [CommonModule],
  declarations: [NgxCoolDialog],
  exports: [NgxCoolDialog],
  entryComponents: [NgxCoolDialog],
})
export class NgxCoolDialogsModule {
  static forRoot(globalConfig?: NgxCoolDialogsGlobalConfig): ModuleWithProviders {
    return {
      ngModule: NgxCoolDialogsModule,
      providers: [
        NgxCoolDialogsService,
        {
          provide: NGX_COOL_DIALOGS_CONFIG,
          useValue: globalConfig,
        },
      ],
    };
  }
}
