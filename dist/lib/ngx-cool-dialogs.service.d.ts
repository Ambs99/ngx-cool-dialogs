import { NgxCoolDialogResult } from './ngx-cool-dialogs-types';
import { ApplicationRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { NgxCoolDialogsLocalConfig } from './ngx-cool-dialogs.config';
export declare class NgxCoolDialogsService {
    private appRef;
    private componentFactoryResolver;
    private injector;
    /**
     * Reference to the main Portal.
     */
    private coolDialogPortal;
    /**
     * Reference to the main Portal Host.
     */
    private bodyPortalHost;
    constructor(appRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    /**
     * Creates an alert popup
     * @param message - text to render inside the popup
     * @param config - optional configuration object
     */
    alert(message: string, config?: NgxCoolDialogsLocalConfig): NgxCoolDialogResult;
    /**
     * Creates a confirm popup
     * @param message - text to render inside the popup
     * @param config - optional configuration object
     */
    confirm(message: string, config?: NgxCoolDialogsLocalConfig): NgxCoolDialogResult;
    /**
     * Creates a prompt popup
     * @param message - text to render inside the popup
     * @param config - optional configuration object
     */
    prompt(prompt: string, config?: NgxCoolDialogsLocalConfig): NgxCoolDialogResult;
    /**
     * Creates a popup
     * @param type - type of the popup: alert, confirm or prompt
     * @param message - main text to render inside the popup
     * @param config - optional configuration object
     */
    private createCoolDialogComponent;
}
