import { __decorate, __param } from "tslib";
import { NgxCoolDialogsBaseConfig, } from './ngx-cool-dialogs.config';
import { fadeInOut } from './ngx-cool-dialogs.animation';
import { NgxCoolDialogType } from './ngx-cool-dialogs-types';
import { Component, HostBinding, ViewEncapsulation, Optional, Inject, ChangeDetectionStrategy, ViewChild, } from '@angular/core';
import { Subject } from 'rxjs';
import { NGX_COOL_DIALOGS_CONFIG } from './ngx-cool-dialogs.config';
import { DomSanitizer } from '@angular/platform-browser';
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
export { NgxCoolDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvb2wtZGlhbG9ncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jb29sLWRpYWxvZ3MvIiwic291cmNlcyI6WyJsaWIvbmd4LWNvb2wtZGlhbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUlMLHdCQUF3QixHQUN6QixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEYsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsaUJBQWlCLEVBRWpCLFFBQVEsRUFDUixNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLFNBQVMsR0FJVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQWF6RCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBK0Z4QixtQ0FBbUM7SUFDbkMsNkJBQTZCO0lBQzdCLEdBQUc7SUFFSDs7O09BR0c7SUFDSCxZQUdVLFlBQXdDLEVBQVMsU0FBdUI7UUFBeEUsaUJBQVksR0FBWixZQUFZLENBQTRCO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQXpHbEY7O1dBRUc7UUFDSyxpQkFBWSxHQUFpRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRW5GOztXQUVHO1FBQ0gsV0FBTSxHQUVGLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFPckM7O1dBRUc7UUFDSCxVQUFLLEdBQUcsaUJBQWlCLENBQUM7UUFPMUI7O1dBRUc7UUFDSCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCOztXQUVHO1FBQ0gscUJBQWdCLEdBQUcsS0FBSyxDQUFD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S0FDaEQsQ0FBQztJQXlHRyxXQUFBLFFBQVEsRUFBRSxDQUFBO0lBQ1YsV0FBQSxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtHQXpHdkIsYUFBYSxDQTJTekI7U0EzU1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5neENvb2xEaWFsb2dzTG9jYWxDb25maWcsXG4gIE5neENvb2xEaWFsb2dzQ29tcGxldGVDb25maWcsXG4gIE5neENvb2xEaWFsb2dzR2xvYmFsQ29uZmlnLFxuICBOZ3hDb29sRGlhbG9nc0Jhc2VDb25maWcsXG59IGZyb20gJy4vbmd4LWNvb2wtZGlhbG9ncy5jb25maWcnO1xuaW1wb3J0IHsgTmd4Q29vbERpYWxvZ1RoZW1lIH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLXRoZW1lJztcbmltcG9ydCB7IGZhZGVJbk91dCB9IGZyb20gJy4vbmd4LWNvb2wtZGlhbG9ncy5hbmltYXRpb24nO1xuaW1wb3J0IHsgTmd4Q29vbERpYWxvZ1R5cGUsIE5neENvb2xEaWFsb2dQcm9tcHRSZXN1bHQgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MtdHlwZXMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5HWF9DT09MX0RJQUxPR1NfQ09ORklHIH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLmNvbmZpZyc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWNvb2wtZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC1jb29sLWRpYWxvZy5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbmd4LWNvb2wtZGlhbG9nLnNjc3MnXSxcbiAgYW5pbWF0aW9uczogW2ZhZGVJbk91dF0sXG4gIGhvc3Q6IHtcbiAgICAnKEBmYWRlSW5PdXQuZG9uZSknOiAnYW5pbWF0aW9uRG9uZSgpJyxcbiAgfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE5neENvb2xEaWFsb2cgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBTdWJqZWN0IHVzZWQgdG8gc3RyZWFtIGNsb3NlIGV2ZW50c1xuICAgKi9cbiAgcHJpdmF0ZSBjbG9zZVN1YmplY3Q6IFN1YmplY3Q8Ym9vbGVhbiB8IE5neENvb2xEaWFsb2dQcm9tcHRSZXN1bHQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICAvKipcbiAgICogT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIG9uIGV2ZXJ5IGNsb3NlIGFjdGlvblxuICAgKi9cbiAgJGNsb3NlOiBPYnNlcnZhYmxlPFxuICAgIGJvb2xlYW4gfCBOZ3hDb29sRGlhbG9nUHJvbXB0UmVzdWx0XG4gID4gPSB0aGlzLmNsb3NlU3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICAvKipcbiAgICogVGhlIHR5cGUgb2YgdGhlIHBvcHVwXG4gICAqL1xuICB0eXBlOiBOZ3hDb29sRGlhbG9nVHlwZTtcblxuICAvKipcbiAgICogTGlzdCBvZiBhbGwgdGhlIGF2YWlsYWJsZSBkaWFsZyB0eXBlc1xuICAgKi9cbiAgdHlwZXMgPSBOZ3hDb29sRGlhbG9nVHlwZTtcblxuICAvKipcbiAgICogTWFpbiB0ZXh0IHRvIHJlbmRlciBpbnNpZGUgdGhlIHBvcHVwXG4gICAqL1xuICBtZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRoZSBwb3B1cCBpcyBjbG9zaW5nXG4gICAqL1xuICBjbG9zaW5nID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRvIGxpc3RlbiB0byAnZW50ZXInIGtleVxuICAgKi9cbiAgY2FuTGlzdGVuVG9FbnRlciA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBFbGVtZW50IHRoYXQgaXMgZm9jdXNlZCBwcmlvciB0byBtb2RhbCBvcGVuaW5nXG4gICAqL1xuICBwcml2YXRlIGVsV2l0aEZvY3VzOiBIVE1MRWxlbWVudDtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdG8gZW5hYmxlIGhvc3QgYW5pbWF0aW9uXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ0BmYWRlSW5PdXQnKVxuICBhbmltYXRpb24gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBDbGFzcyB0byBiZSBhcHBsaWVkIGFjY29yZGluZyB0byB0aGUgZGVzaXJlZCB0aGVtZVxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcycpXG4gIHRoZW1lQ2xhc3M6IHN0cmluZztcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBwcm9tcHQgdGV4dCBpbnB1dFxuICAgKi9cbiAgQFZpZXdDaGlsZCgncHJvbXB0SW5wdXQnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcHJvbXB0SW5wdXQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgcG9wdXAgY29udGVudFxuICAgKi9cbiAgQFZpZXdDaGlsZCgncG9wdXBDb250ZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHBvcHVwQ29udGVudDogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdG8gc2V0IHRoZSBob3N0IGNsYXNzXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5neC1jb29sLWRpYWxvZycpXG4gIHNldEhvc3RDbGFzcyA9IHRydWU7XG5cbiAgLyoqXG4gICAqIFRoZSBjb25maWcgcGFzc2VkIGJ5IHRoZSB1c2VyIHZpYSBzZXJ2aWNlIG1ldGhvZHNcbiAgICovXG4gIGxvY2FsQ29uZmlnOiBOZ3hDb29sRGlhbG9nc0xvY2FsQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBNYXBwZWQgY29uZmlnIHRoYXQgYmxlbmRzIGJvdGggbG9jYWwgYW5kIGdsb2JhbCBjb25maWdzXG4gICAqL1xuICBwcml2YXRlIF9jb25maWc6IE5neENvb2xEaWFsb2dzQ29tcGxldGVDb25maWc7XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IG1hcHBlZCBjb25maWdcbiAgICovXG4gIHJlYWRvbmx5IGNvbmZpZzogTmd4Q29vbERpYWxvZ3NDb21wbGV0ZUNvbmZpZyBcbiAgLy9nZXQgY29uZmlnKCk6IE5neENvb2xEaWFsb2dzQ29tcGxldGVDb25maWcge1xuICAvLyAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgLy99XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHRoZW1lXG4gICAqL1xuICByZWFkb25seSB0aGVtZTogTmd4Q29vbERpYWxvZ1RoZW1lIFxuICAvL2dldCB0aGVtZSgpOiBOZ3hDb29sRGlhbG9nVGhlbWUge1xuICAvLyAgcmV0dXJuIHRoaXMuY29uZmlnLnRoZW1lO1xuICAvL31cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gZ2xvYmFsQ29uZmlnIC0gdGhlIGNvbmZpZ3VyYXRpb24gcGFzc2VkIHZpYSAuZm9yUm9vdCgpXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTkdYX0NPT0xfRElBTE9HU19DT05GSUcpXG4gICAgcHJpdmF0ZSBnbG9iYWxDb25maWc6IE5neENvb2xEaWFsb2dzR2xvYmFsQ29uZmlnLCBwdWJsaWMgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXJcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50IHdpdGggdGhlIHRoZW1lIGFuZCBtYXBwZWQgY29uZmlnc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbFdpdGhGb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IG5ldyBOZ3hDb29sRGlhbG9nc0Jhc2VDb25maWcoKTtcbiAgICB0aGlzLl9jb25maWcgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICBkZWZhdWx0Q29uZmlnLFxuICAgICAgdGhpcy5nbG9iYWxDb25maWcsXG4gICAgICB0aGlzLmxvY2FsQ29uZmlnXG4gICAgKTtcbiAgICB0aGlzLnRoZW1lQ2xhc3MgPSBgbmd4LWNvb2wtZGlhbG9nLS0ke3RoaXMudGhlbWV9LXRoZW1lYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgQW5ndWxhciBpbml0aWFsaXplcyB0aGUgY29tcG9uZW50J3Mgdmlld3NcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBzZXQgdGhlIGZvY3VzIHRvICdjb250ZW50JyBzbyB0aGF0IEVTQyBjYW4gYmUgbGlzdGVuZWQgcmlnaHQgYXdheVxuICAgIHRoaXMucG9wdXBDb250ZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgIC8vIGlmIHRoZSB0eXBlIGlzIFByb21wdCwgdGhlbiBzZXQgdGhlIGZvY3VzIHRvIHRoZSBpbnB1dCBhbmQgc2VsZWN0XG4gICAgLy8gdGhlIHRleHQsIGp1c3QgYXMgd2luZG93LnByb21wdCBkb2VzXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gTmd4Q29vbERpYWxvZ1R5cGUuUHJvbXB0KSB7XG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMucHJvbXB0SW5wdXQubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgIGNvbnN0IGRlZmF1bHRUZXh0ID0gdGhpcy5jb25maWcuZGVmYXVsdFRleHQ7XG4gICAgICBpZiAoZGVmYXVsdFRleHQpIHtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBkZWZhdWx0VGV4dDtcbiAgICAgICAgaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgZGVmYXVsdFRleHQubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIHRoZSAnZXNjJyBrZXlcbiAgICovXG4gIGVzY0tleSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIHRoZSAnZW50ZXInIGtleS4gSXQgbmVlZHMgYSBmYWtlICdkZWJvdW5jZScgb3RoZXJ3aXNlXG4gICAqIHRoZSBwb3B1cCB3b3VsZCBjbG9zZSBpbW1lZGlhdGVseSBhZnRlciBpdCdzIG9wZW5lZCwgaWYgaXRcbiAgICogd2FzIHRyaWdnZXIgdmlhIGFuICdlbnRlcicga2V5IHByaW9yIHRvIHBvcHVwIG9wZW5pbmcuXG4gICAqL1xuICBlbnRlcktleSgpIHtcbiAgICBpZiAodGhpcy5jYW5MaXN0ZW5Ub0VudGVyKSB7XG4gICAgICB0aGlzLmNsb3NlKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGN1cnJlbnQgcG9wdXAuIEVtaXRzIGFuIGV2ZW50IHdpdGggdGhlIHBheWxvYWQuXG4gICAqIFRoZSBwYXlsb2FkIGNhbiBlaXRoZXIgYmUgYSBib29sZWFuLCBvciBhbiBvYmplY3QgaWYgdGhlIHR5cGVcbiAgICogaXMgUHJvbXB0LlxuICAgKiBAcGFyYW0gcmVzdWx0IC0gd2hldGhlciBpdCB3YXMgJ0NhbmNlbCc6IGZhbHNlLCBvciAnT0snOiB0cnVlXG4gICAqL1xuICBjbG9zZShyZXN1bHQgPSBmYWxzZSkge1xuICAgIHRoaXMuY2xvc2luZyA9IHRydWU7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGxldCBwYXlsb2FkO1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gTmd4Q29vbERpYWxvZ1R5cGUuUHJvbXB0KSB7XG4gICAgICAgIHBheWxvYWQgPSB7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnByb21wdElucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgfHwgJycsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXlsb2FkID0gcmVzdWx0O1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZVN1YmplY3QubmV4dChwYXlsb2FkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSAneCcgYnV0dG9uXG4gICAqL1xuICBvbkNsb3NlQnRuQ2xpY2soKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBtYWluIGhvc3QgYW5pbWF0aW9uIGZpbmlzaGVzXG4gICAqL1xuICBhbmltYXRpb25Eb25lKCkge1xuICAgIHRoaXMuY2FuTGlzdGVuVG9FbnRlciA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgJ09LJyBidXR0b25cbiAgICovXG4gIG9uT2tCdG5DbGljaygpIHtcbiAgICB0aGlzLmNsb3NlKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBjbGljayBldmVudHMgb24gdGhlICdDYW5jZWwnIGJ1dHRvblxuICAgKi9cbiAgb25DYW5jZWxCdG5DbGljaygpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgYmFja2Ryb3Agc2hhZG93XG4gICAqL1xuICBvbkJhY2tkcm9wQ2xpY2soKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwb3B1cCdzIHRpdGxlXG4gICAqL1xuICBnZXRUaXRsZSgpIHtcbiAgICAvLyBpZiBhIGdlbmVyaWMgdGl0bGUgZXhpc3RzLCB0aGVuIHVzZSB0aGF0XG4gICAgbGV0IHRpdGxlID0gdGhpcy5jb25maWcudGl0bGU7XG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICByZXR1cm4gdGl0bGU7XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gdGl0bGUgd2FzIHBhc3NlZCBvbiBgb3BlbigpYCwgdGhlbiBzZWFyY2hcbiAgICAvLyB0aHJvdWdoIHRoZSB0aXRsZXMgc2V0IHZpYSBnbG9iYWwgY29uZmlnc1xuICAgIGNvbnN0IHRpdGxlcyA9IHRoaXMuY29uZmlnLnRpdGxlcyB8fCB7fTtcbiAgICBpZiAodGhpcy50eXBlID09PSBOZ3hDb29sRGlhbG9nVHlwZS5BbGVydCkge1xuICAgICAgdGl0bGUgPSB0aXRsZXMuYWxlcnQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IE5neENvb2xEaWFsb2dUeXBlLkNvbmZpcm0pIHtcbiAgICAgIHRpdGxlID0gdGl0bGVzLmNvbmZpcm07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlID0gdGl0bGVzLnByb21wdDtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBvbmVudCBjbGVhbnVwLiByZXR1cm4gdGhlIGZvY3VzIHRvIHRoZSBlbGVtZW50IHRoYXQgd2FzIGFjdGl2ZVxuICAgKiBwcmlvciB0byB0aGUgcG9wdXAgb3BlbmluZ1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZWxXaXRoRm9jdXMgPSB0aGlzLmVsV2l0aEZvY3VzO1xuXG4gICAgbGV0IGVsZW1lbnRUb0ZvY3VzO1xuICAgIGlmIChlbFdpdGhGb2N1cyAmJiBlbFdpdGhGb2N1cy5mb2N1cyAmJiBib2R5LmNvbnRhaW5zKGVsV2l0aEZvY3VzKSkge1xuICAgICAgZWxlbWVudFRvRm9jdXMgPSBlbFdpdGhGb2N1cztcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudFRvRm9jdXMgPSBib2R5O1xuICAgIH1cbiAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuICAgIHRoaXMuZWxXaXRoRm9jdXMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpbGwgY29sb3Igb2YgdGhlICdPSycgYnV0dG9uXG4gICAqL1xuICBnZXRPa0J1dHRvblRleHRDb2xvcigpOiBzdHJpbmcge1xuICAgIC8vIG9ubHkgZm9yIG1hdGVyaWFsIHRoZW1lIHRoZSAnT0snIGhhcyBhIGNvbG9yIGRpZmZlcmVudCB0aGFuIHdoaXRlXG4gICAgaWYgKHRoaXMudGhlbWUgPT09ICdtYXRlcmlhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2xvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlsbCBjb2xvciBvZiB0aGUgJ09LJyBidXR0b25cbiAgICovXG4gIGdldE9rQnV0dG9uRmlsbENvbG9yKCk6IHN0cmluZyB7XG4gICAgLy8gbWF0ZXJpYWwgdGhlbWUgZG9lc24ndCBoYXZlIGZpbGxlZCBidXR0b25zXG4gICAgaWYgKHRoaXMudGhlbWUgIT09ICdtYXRlcmlhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2xvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYm9yZGVyIGNvbG9yIG9mIHRoZSAnQ2FuY2VsJyBidXR0b25cbiAgICovXG4gIGdldENhbmNlbEJ1dHRvbkJvcmRlckNvbG9yKCk6IHN0cmluZyB7XG4gICAgLy8gbWF0ZXJpYWwgdGhlbWUgZG9lc24ndCBoYXZlIGJvcmRlclxuICAgIGlmICh0aGlzLnRoZW1lICE9PSAnbWF0ZXJpYWwnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRleHQgY29sb3Igb2YgdGhlICdDYW5jZWwnIGJ1dHRvblxuICAgKi9cbiAgZ2V0Q2FuY2VsQnV0dG9uVGV4dENvbG9yKCk6IHN0cmluZyB7XG4gICAgLy8gZm9yIGRhcmsgdGhlbWUgdGhlIHRleHQgc2hvdWxkIGFsd2F5cyBiZSB3aGl0ZVxuICAgIGlmICh0aGlzLnRoZW1lICE9PSAnZGFyaycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2xvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==