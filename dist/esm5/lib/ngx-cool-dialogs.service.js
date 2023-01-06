import { __decorate } from "tslib";
import { NgxCoolDialogType, } from './ngx-cool-dialogs-types';
import { NgxCoolDialog } from './ngx-cool-dialogs';
import { Injectable, ApplicationRef, ComponentFactoryResolver, Injector, } from '@angular/core';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
var NgxCoolDialogsService = /** @class */ (function () {
    function NgxCoolDialogsService(appRef, componentFactoryResolver, injector) {
        this.appRef = appRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        // Create a Portal based on the NgxCoolDialog component
        this.coolDialogPortal = new ComponentPortal(NgxCoolDialog);
        // Create a PortalHost anchored in document.body
        this.bodyPortalHost = new DomPortalOutlet(document.body, this.componentFactoryResolver, this.appRef, this.injector);
    }
    /**
     * Creates an alert popup
     * @param message - text to render inside the popup
     * @param config - optional configuration object
     */
    NgxCoolDialogsService.prototype.alert = function (message, config) {
        return this.createCoolDialogComponent(NgxCoolDialogType.Alert, message, config);
    };
    /**
     * Creates a confirm popup
     * @param message - text to render inside the popup
     * @param config - optional configuration object
     */
    NgxCoolDialogsService.prototype.confirm = function (message, config) {
        return this.createCoolDialogComponent(NgxCoolDialogType.Confirm, message, config);
    };
    /**
     * Creates a prompt popup
     * @param message - text to render inside the popup
     * @param config - optional configuration object
     */
    NgxCoolDialogsService.prototype.prompt = function (prompt, config) {
        return this.createCoolDialogComponent(NgxCoolDialogType.Prompt, prompt, config);
    };
    /**
     * Creates a popup
     * @param type - type of the popup: alert, confirm or prompt
     * @param message - main text to render inside the popup
     * @param config - optional configuration object
     */
    NgxCoolDialogsService.prototype.createCoolDialogComponent = function (type, message, config) {
        var _this = this;
        var componentRef = this.bodyPortalHost.attachComponentPortal(this.coolDialogPortal);
        var coolDialog = componentRef.instance;
        coolDialog.message = message;
        coolDialog.localConfig = config;
        coolDialog.type = type;
        // subscribe to the popup closing event so that the portal can actually be detached
        var subscription = coolDialog.$close.subscribe(function (res) {
            _this.bodyPortalHost.detach();
            subscription.unsubscribe();
        });
        return new Observable(function (observer) {
            // subscribe to the popup closing event to forward the event to the caller
            var _subscription = coolDialog.$close.subscribe(function (res) {
                _subscription.unsubscribe();
                observer.next(res);
            });
        });
    };
    NgxCoolDialogsService.ctorParameters = function () { return [
        { type: ApplicationRef },
        { type: ComponentFactoryResolver },
        { type: Injector }
    ]; };
    NgxCoolDialogsService = __decorate([
        Injectable()
    ], NgxCoolDialogsService);
    return NgxCoolDialogsService;
}());
export { NgxCoolDialogsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvb2wtZGlhbG9ncy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWNvb2wtZGlhbG9ncy8iLCJzb3VyY2VzIjpbImxpYi9uZ3gtY29vbC1kaWFsb2dzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFDTCxpQkFBaUIsR0FHbEIsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDbkQsT0FBTyxFQUNMLFVBQVUsRUFDVixjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLFFBQVEsR0FDVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXZFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFHbEM7SUFXRSwrQkFDVSxNQUFzQixFQUN0Qix3QkFBa0QsRUFDbEQsUUFBa0I7UUFGbEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBRTFCLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFM0QsZ0RBQWdEO1FBQ2hELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEVBQ2IsSUFBSSxDQUFDLHdCQUF3QixFQUM3QixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxRQUFRLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gscUNBQUssR0FBTCxVQUFNLE9BQWUsRUFBRSxNQUFrQztRQUN2RCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsdUNBQU8sR0FBUCxVQUFRLE9BQWUsRUFBRSxNQUFrQztRQUN6RCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsc0NBQU0sR0FBTixVQUFPLE1BQWMsRUFBRSxNQUFrQztRQUN2RCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHlEQUF5QixHQUFqQyxVQUNFLElBQXVCLEVBQ3ZCLE9BQWUsRUFDZixNQUFrQztRQUhwQyxpQkE0QkM7UUF2QkMsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FDNUQsSUFBSSxDQUFDLGdCQUFnQixDQUN0QixDQUFDO1FBQ0YsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLFFBQXlCLENBQUM7UUFDMUQsVUFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDN0IsVUFBVSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7UUFDaEMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDdkIsbUZBQW1GO1FBQ25GLElBQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUM5QyxVQUFDLEdBQXdDO1lBQ3ZDLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDN0IsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FDRixDQUFDO1FBQ0YsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQVE7WUFDN0IsMEVBQTBFO1lBQzFFLElBQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUMvQyxVQUFDLEdBQXdDO2dCQUN2QyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7O2dCQTdFaUIsY0FBYztnQkFDSSx3QkFBd0I7Z0JBQ3hDLFFBQVE7O0lBZGpCLHFCQUFxQjtRQURqQyxVQUFVLEVBQUU7T0FDQSxxQkFBcUIsQ0EwRmpDO0lBQUQsNEJBQUM7Q0FBQSxBQTFGRCxJQTBGQztTQTFGWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ3hDb29sRGlhbG9nVHlwZSxcbiAgTmd4Q29vbERpYWxvZ1Jlc3VsdCxcbiAgTmd4Q29vbERpYWxvZ1Byb21wdFJlc3VsdCxcbn0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLXR5cGVzJztcbmltcG9ydCB7IE5neENvb2xEaWFsb2cgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MnO1xuaW1wb3J0IHtcbiAgSW5qZWN0YWJsZSxcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0b3IsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBEb21Qb3J0YWxPdXRsZXQgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IE5neENvb2xEaWFsb2dzTG9jYWxDb25maWcgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MuY29uZmlnJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE5neENvb2xEaWFsb2dzU2VydmljZSB7XG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIG1haW4gUG9ydGFsLlxuICAgKi9cbiAgcHJpdmF0ZSBjb29sRGlhbG9nUG9ydGFsOiBDb21wb25lbnRQb3J0YWw8Tmd4Q29vbERpYWxvZz47XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgbWFpbiBQb3J0YWwgSG9zdC5cbiAgICovXG4gIHByaXZhdGUgYm9keVBvcnRhbEhvc3Q6IERvbVBvcnRhbE91dGxldDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsXG4gICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvclxuICApIHtcbiAgICAvLyBDcmVhdGUgYSBQb3J0YWwgYmFzZWQgb24gdGhlIE5neENvb2xEaWFsb2cgY29tcG9uZW50XG4gICAgdGhpcy5jb29sRGlhbG9nUG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChOZ3hDb29sRGlhbG9nKTtcblxuICAgIC8vIENyZWF0ZSBhIFBvcnRhbEhvc3QgYW5jaG9yZWQgaW4gZG9jdW1lbnQuYm9keVxuICAgIHRoaXMuYm9keVBvcnRhbEhvc3QgPSBuZXcgRG9tUG9ydGFsT3V0bGV0KFxuICAgICAgZG9jdW1lbnQuYm9keSxcbiAgICAgIHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgICAgdGhpcy5hcHBSZWYsXG4gICAgICB0aGlzLmluamVjdG9yXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGFsZXJ0IHBvcHVwXG4gICAqIEBwYXJhbSBtZXNzYWdlIC0gdGV4dCB0byByZW5kZXIgaW5zaWRlIHRoZSBwb3B1cFxuICAgKiBAcGFyYW0gY29uZmlnIC0gb3B0aW9uYWwgY29uZmlndXJhdGlvbiBvYmplY3RcbiAgICovXG4gIGFsZXJ0KG1lc3NhZ2U6IHN0cmluZywgY29uZmlnPzogTmd4Q29vbERpYWxvZ3NMb2NhbENvbmZpZyk6IE5neENvb2xEaWFsb2dSZXN1bHQge1xuICAgIHJldHVybiB0aGlzLmNyZWF0ZUNvb2xEaWFsb2dDb21wb25lbnQoTmd4Q29vbERpYWxvZ1R5cGUuQWxlcnQsIG1lc3NhZ2UsIGNvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGNvbmZpcm0gcG9wdXBcbiAgICogQHBhcmFtIG1lc3NhZ2UgLSB0ZXh0IHRvIHJlbmRlciBpbnNpZGUgdGhlIHBvcHVwXG4gICAqIEBwYXJhbSBjb25maWcgLSBvcHRpb25hbCBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgKi9cbiAgY29uZmlybShtZXNzYWdlOiBzdHJpbmcsIGNvbmZpZz86IE5neENvb2xEaWFsb2dzTG9jYWxDb25maWcpOiBOZ3hDb29sRGlhbG9nUmVzdWx0IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb29sRGlhbG9nQ29tcG9uZW50KE5neENvb2xEaWFsb2dUeXBlLkNvbmZpcm0sIG1lc3NhZ2UsIGNvbmZpZyk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHByb21wdCBwb3B1cFxuICAgKiBAcGFyYW0gbWVzc2FnZSAtIHRleHQgdG8gcmVuZGVyIGluc2lkZSB0aGUgcG9wdXBcbiAgICogQHBhcmFtIGNvbmZpZyAtIG9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqL1xuICBwcm9tcHQocHJvbXB0OiBzdHJpbmcsIGNvbmZpZz86IE5neENvb2xEaWFsb2dzTG9jYWxDb25maWcpOiBOZ3hDb29sRGlhbG9nUmVzdWx0IHtcbiAgICByZXR1cm4gdGhpcy5jcmVhdGVDb29sRGlhbG9nQ29tcG9uZW50KE5neENvb2xEaWFsb2dUeXBlLlByb21wdCwgcHJvbXB0LCBjb25maWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBwb3B1cFxuICAgKiBAcGFyYW0gdHlwZSAtIHR5cGUgb2YgdGhlIHBvcHVwOiBhbGVydCwgY29uZmlybSBvciBwcm9tcHRcbiAgICogQHBhcmFtIG1lc3NhZ2UgLSBtYWluIHRleHQgdG8gcmVuZGVyIGluc2lkZSB0aGUgcG9wdXBcbiAgICogQHBhcmFtIGNvbmZpZyAtIG9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUNvb2xEaWFsb2dDb21wb25lbnQoXG4gICAgdHlwZTogTmd4Q29vbERpYWxvZ1R5cGUsXG4gICAgbWVzc2FnZTogc3RyaW5nLFxuICAgIGNvbmZpZz86IE5neENvb2xEaWFsb2dzTG9jYWxDb25maWdcbiAgKTogTmd4Q29vbERpYWxvZ1Jlc3VsdCB7XG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5ib2R5UG9ydGFsSG9zdC5hdHRhY2hDb21wb25lbnRQb3J0YWwoXG4gICAgICB0aGlzLmNvb2xEaWFsb2dQb3J0YWxcbiAgICApO1xuICAgIGNvbnN0IGNvb2xEaWFsb2cgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UgYXMgTmd4Q29vbERpYWxvZztcbiAgICBjb29sRGlhbG9nLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGNvb2xEaWFsb2cubG9jYWxDb25maWcgPSBjb25maWc7XG4gICAgY29vbERpYWxvZy50eXBlID0gdHlwZTtcbiAgICAvLyBzdWJzY3JpYmUgdG8gdGhlIHBvcHVwIGNsb3NpbmcgZXZlbnQgc28gdGhhdCB0aGUgcG9ydGFsIGNhbiBhY3R1YWxseSBiZSBkZXRhY2hlZFxuICAgIGNvbnN0IHN1YnNjcmlwdGlvbiA9IGNvb2xEaWFsb2cuJGNsb3NlLnN1YnNjcmliZShcbiAgICAgIChyZXM6IGJvb2xlYW4gfCBOZ3hDb29sRGlhbG9nUHJvbXB0UmVzdWx0KSA9PiB7XG4gICAgICAgIHRoaXMuYm9keVBvcnRhbEhvc3QuZGV0YWNoKCk7XG4gICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcikgPT4ge1xuICAgICAgLy8gc3Vic2NyaWJlIHRvIHRoZSBwb3B1cCBjbG9zaW5nIGV2ZW50IHRvIGZvcndhcmQgdGhlIGV2ZW50IHRvIHRoZSBjYWxsZXJcbiAgICAgIGNvbnN0IF9zdWJzY3JpcHRpb24gPSBjb29sRGlhbG9nLiRjbG9zZS5zdWJzY3JpYmUoXG4gICAgICAgIChyZXM6IGJvb2xlYW4gfCBOZ3hDb29sRGlhbG9nUHJvbXB0UmVzdWx0KSA9PiB7XG4gICAgICAgICAgX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxufVxuIl19