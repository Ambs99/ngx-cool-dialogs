import { __decorate, __param } from 'tslib';
import { InjectionToken, Optional, Inject, HostBinding, ViewChild, Component, ViewEncapsulation, ChangeDetectionStrategy, ApplicationRef, ComponentFactoryResolver, Injector, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ComponentPortal, DomPortalOutlet } from '@angular/cdk/portal';

/**
 * Base configuration object. It applies to both local and global
 * settings. Local refers to config passed through the service's
 * methods; Global referes to config passed through the module's
 * .forRoot()
 */
class NgxCoolDialogsBaseConfig {
    constructor() {
        this.theme = 'default';
        this.color = '#3F51B5';
    }
}
/**
 * Configuration injection token
 */
let NGX_COOL_DIALOGS_CONFIG = new InjectionToken('ngx-cool-dialogs.config');

const fadeInOut = trigger('fadeInOut', [
    state('in', style({ opacity: '1' })),
    transition('void => *', [
        style({ opacity: 0 }),
        animate('.3s ease')
    ]),
    transition('* => void', [
        animate('0.3s 150ms ease', style({ opacity: 0 }))
    ])
]);

/**
 * Available popup types
 */
var NgxCoolDialogType;
(function (NgxCoolDialogType) {
    NgxCoolDialogType[NgxCoolDialogType["Alert"] = 0] = "Alert";
    NgxCoolDialogType[NgxCoolDialogType["Confirm"] = 1] = "Confirm";
    NgxCoolDialogType[NgxCoolDialogType["Prompt"] = 2] = "Prompt";
})(NgxCoolDialogType || (NgxCoolDialogType = {}));

let NgxCoolDialog = class NgxCoolDialog {
    //get theme(): NgxCoolDialogTheme {
    //  return this.config.theme;
    //}
    /**
     * Initializes the component
     * @param globalConfig - the configuration passed via .forRoot()
     */
    constructor(globalConfig, sanitizer) {
        this.globalConfig = globalConfig;
        this.sanitizer = sanitizer;
        /**
         * Subject used to stream close events
         */
        this.closeSubject = new Subject();
        /**
         * Observable that emits on every close action
         */
        this.$close = this.closeSubject.asObservable();
        /**
         * List of all the available dialg types
         */
        this.types = NgxCoolDialogType;
        /**
         * Whether or not the popup is closing
         */
        this.closing = false;
        /**
         * Whether or not to listen to 'enter' key
         */
        this.canListenToEnter = false;
        /**
         * Whether or not to enable host animation
         */
        this.animation = true;
        /**
         * Whether or not to set the host class
         */
        this.setHostClass = true;
    }
    /**
     * Initializes the component with the theme and mapped configs
     */
    ngOnInit() {
        this.elWithFocus = document.activeElement;
        const defaultConfig = new NgxCoolDialogsBaseConfig();
        this._config = Object.assign({}, defaultConfig, this.globalConfig, this.localConfig);
        this.themeClass = `ngx-cool-dialog--${this.theme}-theme`;
    }
    /**
     * Called after Angular initializes the component's views
     */
    ngAfterViewInit() {
        // set the focus to 'content' so that ESC can be listened right away
        this.popupContent.nativeElement.focus();
        // if the type is Prompt, then set the focus to the input and select
        // the text, just as window.prompt does
        if (this.type === NgxCoolDialogType.Prompt) {
            const input = this.promptInput.nativeElement;
            input.focus();
            const defaultText = this.config.defaultText;
            if (defaultText) {
                input.value = defaultText;
                input.setSelectionRange(0, defaultText.length);
            }
        }
    }
    /**
     * Listener for the 'esc' key
     */
    escKey() {
        this.close();
    }
    /**
     * Listener for the 'enter' key. It needs a fake 'debounce' otherwise
     * the popup would close immediately after it's opened, if it
     * was trigger via an 'enter' key prior to popup opening.
     */
    enterKey() {
        if (this.canListenToEnter) {
            this.close(true);
        }
    }
    /**
     * Closes the current popup. Emits an event with the payload.
     * The payload can either be a boolean, or an object if the type
     * is Prompt.
     * @param result - whether it was 'Cancel': false, or 'OK': true
     */
    close(result = false) {
        this.closing = true;
        requestAnimationFrame(() => {
            let payload;
            if (this.type === NgxCoolDialogType.Prompt) {
                payload = {
                    result,
                    value: this.promptInput.nativeElement.value || '',
                };
            }
            else {
                payload = result;
            }
            this.closeSubject.next(payload);
        });
    }
    /**
     * Listener for click events on the 'x' button
     */
    onCloseBtnClick() {
        this.close();
    }
    /**
     * Function called when the main host animation finishes
     */
    animationDone() {
        this.canListenToEnter = true;
    }
    /**
     * Listener for click events on the 'OK' button
     */
    onOkBtnClick() {
        this.close(true);
    }
    /**
     * Listener for click events on the 'Cancel' button
     */
    onCancelBtnClick() {
        this.close();
    }
    /**
     * Listener for click events on the backdrop shadow
     */
    onBackdropClick() {
        this.close();
    }
    /**
     * The popup's title
     */
    getTitle() {
        // if a generic title exists, then use that
        let title = this.config.title;
        if (title) {
            return title;
        }
        // if no title was passed on `open()`, then search
        // through the titles set via global configs
        const titles = this.config.titles || {};
        if (this.type === NgxCoolDialogType.Alert) {
            title = titles.alert;
        }
        else if (this.type === NgxCoolDialogType.Confirm) {
            title = titles.confirm;
        }
        else {
            title = titles.prompt;
        }
        return title;
    }
    /**
     * Component cleanup. return the focus to the element that was active
     * prior to the popup opening
     */
    ngOnDestroy() {
        const body = document.body;
        const elWithFocus = this.elWithFocus;
        let elementToFocus;
        if (elWithFocus && elWithFocus.focus && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        elementToFocus.focus();
        this.elWithFocus = null;
    }
    /**
     * Returns the fill color of the 'OK' button
     */
    getOkButtonTextColor() {
        // only for material theme the 'OK' has a color different than white
        if (this.theme === 'material') {
            return this.config.color;
        }
    }
    /**
     * Returns the fill color of the 'OK' button
     */
    getOkButtonFillColor() {
        // material theme doesn't have filled buttons
        if (this.theme !== 'material') {
            return this.config.color;
        }
    }
    /**
     * Returns the border color of the 'Cancel' button
     */
    getCancelButtonBorderColor() {
        // material theme doesn't have border
        if (this.theme !== 'material') {
            return this.config.color;
        }
    }
    /**
     * Returns the text color of the 'Cancel' button
     */
    getCancelButtonTextColor() {
        // for dark theme the text should always be white
        if (this.theme !== 'dark') {
            return this.config.color;
        }
    }
};
NgxCoolDialog.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_COOL_DIALOGS_CONFIG,] }] },
    { type: DomSanitizer }
];
__decorate([
    HostBinding('@fadeInOut')
], NgxCoolDialog.prototype, "animation", void 0);
__decorate([
    HostBinding('class')
], NgxCoolDialog.prototype, "themeClass", void 0);
__decorate([
    ViewChild('promptInput', { static: false })
], NgxCoolDialog.prototype, "promptInput", void 0);
__decorate([
    ViewChild('popupContent', { static: false })
], NgxCoolDialog.prototype, "popupContent", void 0);
__decorate([
    HostBinding('class.ngx-cool-dialog')
], NgxCoolDialog.prototype, "setHostClass", void 0);
NgxCoolDialog = __decorate([
    Component({
        selector: 'ngx-cool-dialog',
        template: "<div\n  class=\"ngx-cool-dialog__backdrop\"\n  (click)=\"onBackdropClick()\"\n  [@fadeInOut]\n></div>\n<div\n  class=\"ngx-cool-dialog__content\"\n  #popupContent\n  tabindex=\"-1\"\n  (keyup.esc)=\"escKey()\"\n  (keyup.enter)=\"enterKey()\"\n  [class.ngx-cool-dialog__content--closing]=\"closing\"\n>\n  <div class=\"ngx-cool-dialog__header\">\n    <h3 class=\"ngx-cool-dialog__title\">\n      <ng-container *ngIf=\"getTitle(); else anotherTitle\">\n        {{ getTitle() }}\n      </ng-container>\n      <ng-template #anotherTitle>\n        <ng-container\n          *ngIf=\"type === types.Alert\"\n          i18n=\"The default title for Alert dialogs@@ngxCoolDialogAlert\"\n        >\n          Alert\n        </ng-container>\n        <ng-container\n          *ngIf=\"type === types.Confirm\"\n          i18n=\"The default title for Confirm dialogs@@ngxCoolDialogConfirm\"\n        >\n          Confirm\n        </ng-container>\n        <ng-container\n          *ngIf=\"type === types.Prompt\"\n          i18n=\"The default title for Prompt dialogs@@ngxCoolDialogPrompt\"\n        >\n          Prompt\n        </ng-container>\n      </ng-template>\n    </h3>\n    <button\n      class=\"ngx-cool-dialog__close-btn\"\n      *ngIf=\"theme !== 'material'\"\n      (click)=\"onCloseBtnClick()\"\n    >\n      <span class=\"ngx-cool-dialog__close-symbol\"></span>\n    </button>\n  </div>\n  <hr class=\"ngx-cool-dialog__divider\" />\n  <p\n    class=\"ngx-cool-dialog__text\"\n    [innerHtml]=\"sanitizer.bypassSecurityTrustHtml(message)\"\n  ></p>\n  <input\n    *ngIf=\"type === types.Prompt\"\n    type=\"text\"\n    #promptInput\n    autofocus\n    class=\"ngx-cool-dialog__input\"\n  />\n  <div class=\"ngx-cool-dialog__footer\">\n    <button\n      *ngIf=\"type === types.Confirm || type === types.Prompt\"\n      class=\"ngx-cool-dialog__cancel-btn\"\n      [style.color]=\"getCancelButtonTextColor()\"\n      [style.border-color]=\"getCancelButtonBorderColor()\"\n      (click)=\"onCancelBtnClick()\"\n    >\n      <ng-container\n        *ngIf=\"!config.cancelButtonText; else customCancelLabel\"\n        i18n=\"The default text in the Cancel btn@@ngxCoolDialogCancelButton\"\n      >\n        Cancel\n      </ng-container>\n      <ng-template #customCancelLabel>\n        {{ config.cancelButtonText }}\n      </ng-template>\n    </button>\n    <button\n      class=\"ngx-cool-dialog__ok-btn\"\n      [style.color]=\"getOkButtonTextColor()\"\n      [style.background-color]=\"getOkButtonFillColor()\"\n      (click)=\"onOkBtnClick()\"\n    >\n      <ng-container\n        *ngIf=\"!config.okButtonText; else customOkLabel\"\n        i18n=\"The default text in the OK btn@@ngxCoolDialogOKButton\"\n      >\n        OK\n      </ng-container>\n      <ng-template #customOkLabel> {{ config.okButtonText }} </ng-template>\n    </button>\n  </div>\n</div>\n",
        animations: [fadeInOut],
        host: {
            '(@fadeInOut.done)': 'animationDone()',
        },
        encapsulation: ViewEncapsulation.None,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [".ngx-cool-dialog{position:fixed;z-index:9999;top:0;width:100%;left:0;height:100%;text-align:center;align-items:center;display:flex;justify-content:center;padding:0 20px}.ngx-cool-dialog__backdrop{position:absolute;z-index:10;top:0;bottom:0;left:0;right:0;background:rgba(5,6,19,.64)}.ngx-cool-dialog__backdrop--hidden{background:0 0}.ngx-cool-dialog__content{width:425px;background:#fff;box-shadow:0 3px 13px rgba(0,0,0,.5);border-radius:2px;overflow:hidden;z-index:20;position:relative;padding:19px 21px;animation-name:ngx-cool-dialog-fade-in-up;animation-fill-mode:forwards;animation-duration:.5s;animation-timing-function:cubic-bezier(.785,.135,.15,.86);box-sizing:border-box}.ngx-cool-dialog__content--closing{animation-name:ngx-cool-dialog-fade-out-down;animation-timing-function:ease-out}.ngx-cool-dialog__input{display:block;width:100%;margin-bottom:20px;height:38px;border-radius:2px;border:1px solid #d6d6d6;font-size:1em;padding:0 10px;box-sizing:border-box}.ngx-cool-dialog__header{display:flex;justify-content:space-between;margin-bottom:18px;align-items:center}.ngx-cool-dialog__title{margin:0;font-size:1.14em;font-weight:600}.ngx-cool-dialog__divider{border-top:1px solid #ededed;border-bottom:none;margin-bottom:14px;border-right:none;border-left:none}.ngx-cool-dialog__text{margin-top:0;text-align:left;line-height:1.6em;margin-bottom:16px}.ngx-cool-dialog__footer{display:flex;justify-content:flex-end}.ngx-cool-dialog__cancel-btn,.ngx-cool-dialog__ok-btn{height:36px;padding:0 24px;border-radius:2px;font-weight:600;font-size:1em}.ngx-cool-dialog__cancel-btn{border:1px solid #3f51b5;color:#3f51b5;background:0 0;margin-right:16px}.ngx-cool-dialog__cancel-btn:hover{background:#fafafa}.ngx-cool-dialog__ok-btn{border:none;background:#3f51b5;color:#fff;min-width:100px}.ngx-cool-dialog__ok-btn:hover{opacity:.93}.ngx-cool-dialog__close-btn{border:none;background:0 0;padding:0;cursor:pointer}.ngx-cool-dialog__close-symbol{height:12px;width:12px;position:relative;display:block}.ngx-cool-dialog__close-symbol:after,.ngx-cool-dialog__close-symbol:before{content:\"\";height:2px;width:100%;border-radius:2px;background:#d9d9d9;position:absolute;top:calc(50% - 1px);left:0}.ngx-cool-dialog__close-symbol:after{transform:rotate(45deg)}.ngx-cool-dialog__close-symbol:before{transform:rotate(-45deg)}.ngx-cool-dialog__close-symbol:hover:after,.ngx-cool-dialog__close-symbol:hover:before{background:#bdbdbd}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__divider{border-top-color:#424346}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__content{background:#323337}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__title{color:#fff;font-weight:700}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__text{color:#fff;font-weight:600}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn{background:0 0;color:#fff;border-width:2px}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn:hover{background:rgba(255,255,255,.03)}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__input{background:0 0;color:#fff}@keyframes ngx-cool-dialog-fade-in-up{from{opacity:0;transform:translateY(11px)}to{opacity:1;transform:translateY(0)}}@keyframes ngx-cool-dialog-fade-out-down{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(17px)}}.ngx-cool-dialog--material-theme .ngx-cool-dialog__divider{display:none}.ngx-cool-dialog--material-theme .ngx-cool-dialog__title{font-size:1.42em;font-weight:700}.ngx-cool-dialog--material-theme .ngx-cool-dialog__content{padding-bottom:15px}.ngx-cool-dialog--material-theme .ngx-cool-dialog__header{margin-bottom:12px}.ngx-cool-dialog--material-theme .ngx-cool-dialog__ok-btn{min-width:inherit;background:0 0;color:#3f51b5;margin-left:0}.ngx-cool-dialog--material-theme .ngx-cool-dialog__ok-btn:hover{background:#fafafa}.ngx-cool-dialog--material-theme .ngx-cool-dialog__cancel-btn{border:none}.ngx-cool-dialog--material-theme .ngx-cool-dialog__cancel-btn,.ngx-cool-dialog--material-theme .ngx-cool-dialog__ok-btn{padding:0 16px;font-weight:700;text-transform:uppercase}.ngx-cool-dialog--material-theme .ngx-cool-dialog__text{font-size:1.14em;margin-bottom:12px}.ngx-cool-dialog--material-theme .ngx-cool-dialog__input{border-radius:0;border:none;border-bottom:1px solid #979797;padding-left:0;font-size:1.14em}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__divider{border-top-color:#424346}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__content{background:#323337}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__title{color:#fff;font-weight:700}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__text{color:#fff;font-weight:600}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn{background:0 0;color:#fff;border-width:2px}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn:hover{background:rgba(255,255,255,.03)}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__input{background:0 0;color:#fff}@media screen and (min-device-width:320px) and (max-device-width:480px){.ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn,.ngx-cool-dialog--dark-theme .ngx-cool-dialog__ok-btn,.ngx-cool-dialog--default-theme .ngx-cool-dialog__cancel-btn,.ngx-cool-dialog--default-theme .ngx-cool-dialog__ok-btn{flex:1;padding:10px;height:inherit}}"]
    }),
    __param(0, Optional()),
    __param(0, Inject(NGX_COOL_DIALOGS_CONFIG))
], NgxCoolDialog);

let NgxCoolDialogsService = class NgxCoolDialogsService {
    constructor(appRef, componentFactoryResolver, injector) {
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
    alert(message, config) {
        return this.createCoolDialogComponent(NgxCoolDialogType.Alert, message, config);
    }
    /**
     * Creates a confirm popup
     * @param message - text to render inside the popup
     * @param config - optional configuration object
     */
    confirm(message, config) {
        return this.createCoolDialogComponent(NgxCoolDialogType.Confirm, message, config);
    }
    /**
     * Creates a prompt popup
     * @param message - text to render inside the popup
     * @param config - optional configuration object
     */
    prompt(prompt, config) {
        return this.createCoolDialogComponent(NgxCoolDialogType.Prompt, prompt, config);
    }
    /**
     * Creates a popup
     * @param type - type of the popup: alert, confirm or prompt
     * @param message - main text to render inside the popup
     * @param config - optional configuration object
     */
    createCoolDialogComponent(type, message, config) {
        const componentRef = this.bodyPortalHost.attachComponentPortal(this.coolDialogPortal);
        const coolDialog = componentRef.instance;
        coolDialog.message = message;
        coolDialog.localConfig = config;
        coolDialog.type = type;
        // subscribe to the popup closing event so that the portal can actually be detached
        const subscription = coolDialog.$close.subscribe((res) => {
            this.bodyPortalHost.detach();
            subscription.unsubscribe();
        });
        return new Observable((observer) => {
            // subscribe to the popup closing event to forward the event to the caller
            const _subscription = coolDialog.$close.subscribe((res) => {
                _subscription.unsubscribe();
                observer.next(res);
            });
        });
    }
};
NgxCoolDialogsService.ctorParameters = () => [
    { type: ApplicationRef },
    { type: ComponentFactoryResolver },
    { type: Injector }
];
NgxCoolDialogsService = __decorate([
    Injectable()
], NgxCoolDialogsService);

var NgxCoolDialogsModule_1;
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

/**
 * Generated bundle index. Do not edit.
 */

export { NGX_COOL_DIALOGS_CONFIG, NgxCoolDialog, NgxCoolDialogType, NgxCoolDialogsBaseConfig, NgxCoolDialogsModule, NgxCoolDialogsService, fadeInOut as ɵa };
//# sourceMappingURL=ngx-cool-dialogs.js.map
