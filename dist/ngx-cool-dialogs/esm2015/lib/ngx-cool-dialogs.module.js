var NgxCoolDialogsModule_1;
import { __decorate } from "tslib";
import { NGX_COOL_DIALOGS_CONFIG } from './ngx-cool-dialogs.config';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCoolDialog } from './ngx-cool-dialogs';
import { NgxCoolDialogsService } from './ngx-cool-dialogs.service';
let NgxCoolDialogsModule = NgxCoolDialogsModule_1 = class NgxCoolDialogsModule {
    static forRoot(globalConfig) {
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
    }
};
NgxCoolDialogsModule = NgxCoolDialogsModule_1 = __decorate([
    NgModule({
        imports: [CommonModule],
        declarations: [NgxCoolDialog],
        exports: [NgxCoolDialog],
        entryComponents: [NgxCoolDialog],
    })
], NgxCoolDialogsModule);
export { NgxCoolDialogsModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvb2wtZGlhbG9ncy5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY29vbC1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL25neC1jb29sLWRpYWxvZ3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQVNuRSxJQUFhLG9CQUFvQiw0QkFBakMsTUFBYSxvQkFBb0I7SUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUF5QztRQUN0RCxPQUFPO1lBQ0wsUUFBUSxFQUFFLHNCQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QscUJBQXFCO2dCQUNyQjtvQkFDRSxPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQWJZLG9CQUFvQjtJQU5oQyxRQUFRLENBQUM7UUFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDO1FBQzdCLE9BQU8sRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUN4QixlQUFlLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDakMsQ0FBQztHQUNXLG9CQUFvQixDQWFoQztTQWJZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5HWF9DT09MX0RJQUxPR1NfQ09ORklHIH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLmNvbmZpZyc7XG5pbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5neENvb2xEaWFsb2cgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MnO1xuaW1wb3J0IHsgTmd4Q29vbERpYWxvZ3NTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLnNlcnZpY2UnO1xuaW1wb3J0IHsgTmd4Q29vbERpYWxvZ3NHbG9iYWxDb25maWcgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MuY29uZmlnJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW05neENvb2xEaWFsb2ddLFxuICBleHBvcnRzOiBbTmd4Q29vbERpYWxvZ10sXG4gIGVudHJ5Q29tcG9uZW50czogW05neENvb2xEaWFsb2ddLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hDb29sRGlhbG9nc01vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGdsb2JhbENvbmZpZz86IE5neENvb2xEaWFsb2dzR2xvYmFsQ29uZmlnKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZ3hDb29sRGlhbG9nc01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBOZ3hDb29sRGlhbG9nc1NlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfQ09PTF9ESUFMT0dTX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogZ2xvYmFsQ29uZmlnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=