import { __decorate } from "tslib";
import { NGX_COOL_DIALOGS_CONFIG } from './ngx-cool-dialogs.config';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCoolDialog } from './ngx-cool-dialogs';
import { NgxCoolDialogsService } from './ngx-cool-dialogs.service';
var NgxCoolDialogsModule = /** @class */ (function () {
    function NgxCoolDialogsModule() {
    }
    NgxCoolDialogsModule_1 = NgxCoolDialogsModule;
    NgxCoolDialogsModule.forRoot = function (globalConfig) {
        return {
            ngModule: NgxCoolDialogsModule_1,
            providers: [
                NgxCoolDialogsService,
                {
                    provide: NGX_COOL_DIALOGS_CONFIG,
                    useValue: globalConfig,
                },
            ],
        };
    };
    var NgxCoolDialogsModule_1;
    NgxCoolDialogsModule = NgxCoolDialogsModule_1 = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [NgxCoolDialog],
            exports: [NgxCoolDialog],
            entryComponents: [NgxCoolDialog],
        })
    ], NgxCoolDialogsModule);
    return NgxCoolDialogsModule;
}());
export { NgxCoolDialogsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvb2wtZGlhbG9ncy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY29vbC1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL25neC1jb29sLWRpYWxvZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBU25FO0lBQUE7SUFhQSxDQUFDOzZCQWJZLG9CQUFvQjtJQUN4Qiw0QkFBTyxHQUFkLFVBQWUsWUFBeUM7UUFDdEQsT0FBTztZQUNMLFFBQVEsRUFBRSxzQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULHFCQUFxQjtnQkFDckI7b0JBQ0UsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7SUFaVSxvQkFBb0I7UUFOaEMsUUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7WUFDeEIsZUFBZSxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQ2pDLENBQUM7T0FDVyxvQkFBb0IsQ0FhaEM7SUFBRCwyQkFBQztDQUFBLEFBYkQsSUFhQztTQWJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5HWF9DT09MX0RJQUxPR1NfQ09ORklHIH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLmNvbmZpZyc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neENvb2xEaWFsb2cgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MnO1xuaW1wb3J0IHsgTmd4Q29vbERpYWxvZ3NTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmd4Q29vbERpYWxvZ3NHbG9iYWxDb25maWcgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MuY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05neENvb2xEaWFsb2ddLFxuICBleHBvcnRzOiBbTmd4Q29vbERpYWxvZ10sXG4gIGVudHJ5Q29tcG9uZW50czogW05neENvb2xEaWFsb2ddLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hDb29sRGlhbG9nc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGdsb2JhbENvbmZpZz86IE5neENvb2xEaWFsb2dzR2xvYmFsQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hDb29sRGlhbG9nc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBOZ3hDb29sRGlhbG9nc1NlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfQ09PTF9ESUFMT0dTX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogZ2xvYmFsQ29uZmlnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=