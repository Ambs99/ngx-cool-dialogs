import { __decorate, __param } from "tslib";
import { NgxCoolDialogsBaseConfig, } from './ngx-cool-dialogs.config';
import { fadeInOut } from './ngx-cool-dialogs.animation';
import { NgxCoolDialogType } from './ngx-cool-dialogs-types';
import { Component, HostBinding, ViewEncapsulation, Optional, Inject, ChangeDetectionStrategy, ViewChild, } from '@angular/core';
import { Subject } from 'rxjs';
import { NGX_COOL_DIALOGS_CONFIG } from './ngx-cool-dialogs.config';
let NgxCoolDialog = class NgxCoolDialog {
    /**
     * Initializes the component
     * @param globalConfig - the configuration passed via .forRoot()
     */
    constructor(globalConfig) {
        this.globalConfig = globalConfig;
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
     * The current mapped config
     */
    get config() {
        return this._config;
    }
    /**
     * The current theme
     */
    get theme() {
        return this.config.theme;
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
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_COOL_DIALOGS_CONFIG,] }] }
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
        template: "<div class=\"ngx-cool-dialog__backdrop\"\n     (click)=\"onBackdropClick()\"\n     [@fadeInOut]></div>\n<div class=\"ngx-cool-dialog__content\"\n     #popupContent\n     tabindex=\"-1\"\n     (keyup.esc)=\"escKey()\"\n     (keyup.enter)=\"enterKey()\"\n     [class.ngx-cool-dialog__content--closing]=\"closing\">\n      <div class=\"ngx-cool-dialog__header\">\n        <h3 class=\"ngx-cool-dialog__title\">\n          <ng-container *ngIf=\"getTitle(); else anotherTitle\">\n            {{ getTitle() }}\n          </ng-container>\n          <ng-template #anotherTitle>\n            <ng-container *ngIf=\"type === types.Alert\"\n                          i18n=\"The default title for Alert dialogs@@ngxCoolDialogAlert\">\n              Alert\n            </ng-container>\n            <ng-container *ngIf=\"type === types.Confirm\"\n                          i18n=\"The default title for Confirm dialogs@@ngxCoolDialogConfirm\">\n              Confirm\n            </ng-container>\n            <ng-container *ngIf=\"type === types.Prompt\"\n                          i18n=\"The default title for Prompt dialogs@@ngxCoolDialogPrompt\">\n              Prompt\n            </ng-container>\n          </ng-template>\n        </h3>\n        <button class=\"ngx-cool-dialog__close-btn\"\n                *ngIf=\"theme !== 'material'\"\n                (click)=\"onCloseBtnClick()\">\n          <span class=\"ngx-cool-dialog__close-symbol\"></span>\n        </button>\n      </div>\n      <hr class=\"ngx-cool-dialog__divider\">\n      <p class=\"ngx-cool-dialog__text\" [innerHtml]=\"message\"></p>\n      <input *ngIf=\"type === types.Prompt\"\n             type=\"text\"\n             #promptInput\n             autofocus\n             class=\"ngx-cool-dialog__input\">\n      <div class=\"ngx-cool-dialog__footer\">\n        <button *ngIf=\"type === types.Confirm || type === types.Prompt\"\n                class=\"ngx-cool-dialog__cancel-btn\"\n                [style.color]=\"getCancelButtonTextColor()\"\n                [style.border-color]=\"getCancelButtonBorderColor()\"\n                (click)=\"onCancelBtnClick()\">\n          <ng-container *ngIf=\"!config.cancelButtonText; else customCancelLabel\"\n            i18n=\"The default text in the Cancel btn@@ngxCoolDialogCancelButton\">\n            Cancel\n          </ng-container>\n          <ng-template #customCancelLabel>\n            {{ config.cancelButtonText }}\n          </ng-template>\n        </button>\n        <button class=\"ngx-cool-dialog__ok-btn\"\n                [style.color]=\"getOkButtonTextColor()\"\n                [style.background-color]=\"getOkButtonFillColor()\"\n                (click)=\"onOkBtnClick()\">\n          <ng-container *ngIf=\"!config.okButtonText; else customOkLabel\"\n            i18n=\"The default text in the OK btn@@ngxCoolDialogOKButton\">\n            OK\n          </ng-container>\n          <ng-template #customOkLabel>\n            {{ config.okButtonText }}\n          </ng-template>\n        </button>\n      </div>\n</div>\n",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvb2wtZGlhbG9ncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jb29sLWRpYWxvZ3MvIiwic291cmNlcyI6WyJsaWIvbmd4LWNvb2wtZGlhbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUlMLHdCQUF3QixHQUN6QixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEYsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsaUJBQWlCLEVBRWpCLFFBQVEsRUFDUixNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLFNBQVMsR0FJVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBYXBFLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFpR3hCOzs7T0FHRztJQUNILFlBR1UsWUFBd0M7UUFBeEMsaUJBQVksR0FBWixZQUFZLENBQTRCO1FBdkdsRDs7V0FFRztRQUNLLGlCQUFZLEdBQWlELElBQUksT0FBTyxFQUFFLENBQUM7UUFFbkY7O1dBRUc7UUFDSCxXQUFNLEdBRUYsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQU9yQzs7V0FFRztRQUNILFVBQUssR0FBRyxpQkFBaUIsQ0FBQztRQU8xQjs7V0FFRztRQUNILFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEI7O1dBRUc7UUFDSCxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFPekI7O1dBRUc7UUFFSCxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBb0JqQjs7V0FFRztRQUVILGlCQUFZLEdBQUcsSUFBSSxDQUFDO0lBa0NqQixDQUFDO0lBdEJKOztPQUVHO0lBQ0gsSUFBSSxNQUFN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LHVCQUF1QixDQUFDLE1BQU07O0tBQ2hELENBQUM7SUF1R0csV0FBQSxRQUFRLEVBQUUsQ0FBQTtJQUNWLFdBQUEsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUE7R0F2R3ZCLGFBQWEsQ0F5U3pCO1NBelNZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBOZ3hDb29sRGlhbG9nc0xvY2FsQ29uZmlnLFxuICBOZ3hDb29sRGlhbG9nc0NvbXBsZXRlQ29uZmlnLFxuICBOZ3hDb29sRGlhbG9nc0dsb2JhbENvbmZpZyxcbiAgTmd4Q29vbERpYWxvZ3NCYXNlQ29uZmlnLFxufSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MuY29uZmlnJztcbmltcG9ydCB7IE5neENvb2xEaWFsb2dUaGVtZSB9IGZyb20gJy4vbmd4LWNvb2wtZGlhbG9ncy10aGVtZSc7XG5pbXBvcnQgeyBmYWRlSW5PdXQgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MuYW5pbWF0aW9uJztcbmltcG9ydCB7IE5neENvb2xEaWFsb2dUeXBlLCBOZ3hDb29sRGlhbG9nUHJvbXB0UmVzdWx0IH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLXR5cGVzJztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxuICBPbkluaXQsXG4gIE9wdGlvbmFsLFxuICBJbmplY3QsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBOR1hfQ09PTF9ESUFMT0dTX0NPTkZJRyB9IGZyb20gJy4vbmd4LWNvb2wtZGlhbG9ncy5jb25maWcnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY29vbC1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWNvb2wtZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtY29vbC1kaWFsb2cuc2NzcyddLFxuICBhbmltYXRpb25zOiBbZmFkZUluT3V0XSxcbiAgaG9zdDoge1xuICAgICcoQGZhZGVJbk91dC5kb25lKSc6ICdhbmltYXRpb25Eb25lKCknLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmd4Q29vbERpYWxvZyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFN1YmplY3QgdXNlZCB0byBzdHJlYW0gY2xvc2UgZXZlbnRzXG4gICAqL1xuICBwcml2YXRlIGNsb3NlU3ViamVjdDogU3ViamVjdDxib29sZWFuIHwgTmd4Q29vbERpYWxvZ1Byb21wdFJlc3VsdD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgb24gZXZlcnkgY2xvc2UgYWN0aW9uXG4gICAqL1xuICAkY2xvc2U6IE9ic2VydmFibGU8XG4gICAgYm9vbGVhbiB8IE5neENvb2xEaWFsb2dQcm9tcHRSZXN1bHRcbiAgPiA9IHRoaXMuY2xvc2VTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgcG9wdXBcbiAgICovXG4gIHR5cGU6IE5neENvb2xEaWFsb2dUeXBlO1xuXG4gIC8qKlxuICAgKiBMaXN0IG9mIGFsbCB0aGUgYXZhaWxhYmxlIGRpYWxnIHR5cGVzXG4gICAqL1xuICB0eXBlcyA9IE5neENvb2xEaWFsb2dUeXBlO1xuXG4gIC8qKlxuICAgKiBNYWluIHRleHQgdG8gcmVuZGVyIGluc2lkZSB0aGUgcG9wdXBcbiAgICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIHBvcHVwIGlzIGNsb3NpbmdcbiAgICovXG4gIGNsb3NpbmcgPSBmYWxzZTtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdG8gbGlzdGVuIHRvICdlbnRlcicga2V5XG4gICAqL1xuICBjYW5MaXN0ZW5Ub0VudGVyID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEVsZW1lbnQgdGhhdCBpcyBmb2N1c2VkIHByaW9yIHRvIG1vZGFsIG9wZW5pbmdcbiAgICovXG4gIHByaXZhdGUgZWxXaXRoRm9jdXM6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0byBlbmFibGUgaG9zdCBhbmltYXRpb25cbiAgICovXG4gIEBIb3N0QmluZGluZygnQGZhZGVJbk91dCcpXG4gIGFuaW1hdGlvbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENsYXNzIHRvIGJlIGFwcGxpZWQgYWNjb3JkaW5nIHRvIHRoZSBkZXNpcmVkIHRoZW1lXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgdGhlbWVDbGFzczogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIHByb21wdCB0ZXh0IGlucHV0XG4gICAqL1xuICBAVmlld0NoaWxkKCdwcm9tcHRJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwcm9tcHRJbnB1dDogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBwb3B1cCBjb250ZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCdwb3B1cENvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcG9wdXBDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlIGhvc3QgY2xhc3NcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Mubmd4LWNvb2wtZGlhbG9nJylcbiAgc2V0SG9zdENsYXNzID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGNvbmZpZyBwYXNzZWQgYnkgdGhlIHVzZXIgdmlhIHNlcnZpY2UgbWV0aG9kc1xuICAgKi9cbiAgbG9jYWxDb25maWc6IE5neENvb2xEaWFsb2dzTG9jYWxDb25maWc7XG5cbiAgLyoqXG4gICAqIE1hcHBlZCBjb25maWcgdGhhdCBibGVuZHMgYm90aCBsb2NhbCBhbmQgZ2xvYmFsIGNvbmZpZ3NcbiAgICovXG4gIHByaXZhdGUgX2NvbmZpZzogTmd4Q29vbERpYWxvZ3NDb21wbGV0ZUNvbmZpZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgbWFwcGVkIGNvbmZpZ1xuICAgKi9cbiAgZ2V0IGNvbmZpZygpOiBOZ3hDb29sRGlhbG9nc0NvbXBsZXRlQ29uZmlnIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjdXJyZW50IHRoZW1lXG4gICAqL1xuICBnZXQgdGhlbWUoKTogTmd4Q29vbERpYWxvZ1RoZW1lIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcudGhlbWU7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudFxuICAgKiBAcGFyYW0gZ2xvYmFsQ29uZmlnIC0gdGhlIGNvbmZpZ3VyYXRpb24gcGFzc2VkIHZpYSAuZm9yUm9vdCgpXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKVxuICAgIEBJbmplY3QoTkdYX0NPT0xfRElBTE9HU19DT05GSUcpXG4gICAgcHJpdmF0ZSBnbG9iYWxDb25maWc6IE5neENvb2xEaWFsb2dzR2xvYmFsQ29uZmlnXG4gICkge31cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCB3aXRoIHRoZSB0aGVtZSBhbmQgbWFwcGVkIGNvbmZpZ3NcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZWxXaXRoRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuICAgIGNvbnN0IGRlZmF1bHRDb25maWcgPSBuZXcgTmd4Q29vbERpYWxvZ3NCYXNlQ29uZmlnKCk7XG4gICAgdGhpcy5fY29uZmlnID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHt9LFxuICAgICAgZGVmYXVsdENvbmZpZyxcbiAgICAgIHRoaXMuZ2xvYmFsQ29uZmlnLFxuICAgICAgdGhpcy5sb2NhbENvbmZpZ1xuICAgICk7XG4gICAgdGhpcy50aGVtZUNsYXNzID0gYG5neC1jb29sLWRpYWxvZy0tJHt0aGlzLnRoZW1lfS10aGVtZWA7XG4gIH1cblxuICAvKipcbiAgICogQ2FsbGVkIGFmdGVyIEFuZ3VsYXIgaW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCdzIHZpZXdzXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gc2V0IHRoZSBmb2N1cyB0byAnY29udGVudCcgc28gdGhhdCBFU0MgY2FuIGJlIGxpc3RlbmVkIHJpZ2h0IGF3YXlcbiAgICB0aGlzLnBvcHVwQ29udGVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG5cbiAgICAvLyBpZiB0aGUgdHlwZSBpcyBQcm9tcHQsIHRoZW4gc2V0IHRoZSBmb2N1cyB0byB0aGUgaW5wdXQgYW5kIHNlbGVjdFxuICAgIC8vIHRoZSB0ZXh0LCBqdXN0IGFzIHdpbmRvdy5wcm9tcHQgZG9lc1xuICAgIGlmICh0aGlzLnR5cGUgPT09IE5neENvb2xEaWFsb2dUeXBlLlByb21wdCkge1xuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLnByb21wdElucHV0Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgIGlucHV0LmZvY3VzKCk7XG4gICAgICBjb25zdCBkZWZhdWx0VGV4dCA9IHRoaXMuY29uZmlnLmRlZmF1bHRUZXh0O1xuICAgICAgaWYgKGRlZmF1bHRUZXh0KSB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gZGVmYXVsdFRleHQ7XG4gICAgICAgIGlucHV0LnNldFNlbGVjdGlvblJhbmdlKDAsIGRlZmF1bHRUZXh0Lmxlbmd0aCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciB0aGUgJ2VzYycga2V5XG4gICAqL1xuICBlc2NLZXkoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciB0aGUgJ2VudGVyJyBrZXkuIEl0IG5lZWRzIGEgZmFrZSAnZGVib3VuY2UnIG90aGVyd2lzZVxuICAgKiB0aGUgcG9wdXAgd291bGQgY2xvc2UgaW1tZWRpYXRlbHkgYWZ0ZXIgaXQncyBvcGVuZWQsIGlmIGl0XG4gICAqIHdhcyB0cmlnZ2VyIHZpYSBhbiAnZW50ZXInIGtleSBwcmlvciB0byBwb3B1cCBvcGVuaW5nLlxuICAgKi9cbiAgZW50ZXJLZXkoKSB7XG4gICAgaWYgKHRoaXMuY2FuTGlzdGVuVG9FbnRlcikge1xuICAgICAgdGhpcy5jbG9zZSh0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBjdXJyZW50IHBvcHVwLiBFbWl0cyBhbiBldmVudCB3aXRoIHRoZSBwYXlsb2FkLlxuICAgKiBUaGUgcGF5bG9hZCBjYW4gZWl0aGVyIGJlIGEgYm9vbGVhbiwgb3IgYW4gb2JqZWN0IGlmIHRoZSB0eXBlXG4gICAqIGlzIFByb21wdC5cbiAgICogQHBhcmFtIHJlc3VsdCAtIHdoZXRoZXIgaXQgd2FzICdDYW5jZWwnOiBmYWxzZSwgb3IgJ09LJzogdHJ1ZVxuICAgKi9cbiAgY2xvc2UocmVzdWx0ID0gZmFsc2UpIHtcbiAgICB0aGlzLmNsb3NpbmcgPSB0cnVlO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBsZXQgcGF5bG9hZDtcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09IE5neENvb2xEaWFsb2dUeXBlLlByb21wdCkge1xuICAgICAgICBwYXlsb2FkID0ge1xuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9tcHRJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlIHx8ICcnLFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF5bG9hZCA9IHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2xvc2VTdWJqZWN0Lm5leHQocGF5bG9hZCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgJ3gnIGJ1dHRvblxuICAgKi9cbiAgb25DbG9zZUJ0bkNsaWNrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgd2hlbiB0aGUgbWFpbiBob3N0IGFuaW1hdGlvbiBmaW5pc2hlc1xuICAgKi9cbiAgYW5pbWF0aW9uRG9uZSgpIHtcbiAgICB0aGlzLmNhbkxpc3RlblRvRW50ZXIgPSB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBjbGljayBldmVudHMgb24gdGhlICdPSycgYnV0dG9uXG4gICAqL1xuICBvbk9rQnRuQ2xpY2soKSB7XG4gICAgdGhpcy5jbG9zZSh0cnVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSAnQ2FuY2VsJyBidXR0b25cbiAgICovXG4gIG9uQ2FuY2VsQnRuQ2xpY2soKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBjbGljayBldmVudHMgb24gdGhlIGJhY2tkcm9wIHNoYWRvd1xuICAgKi9cbiAgb25CYWNrZHJvcENsaWNrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcG9wdXAncyB0aXRsZVxuICAgKi9cbiAgZ2V0VGl0bGUoKSB7XG4gICAgLy8gaWYgYSBnZW5lcmljIHRpdGxlIGV4aXN0cywgdGhlbiB1c2UgdGhhdFxuICAgIGxldCB0aXRsZSA9IHRoaXMuY29uZmlnLnRpdGxlO1xuICAgIGlmICh0aXRsZSkge1xuICAgICAgcmV0dXJuIHRpdGxlO1xuICAgIH1cblxuICAgIC8vIGlmIG5vIHRpdGxlIHdhcyBwYXNzZWQgb24gYG9wZW4oKWAsIHRoZW4gc2VhcmNoXG4gICAgLy8gdGhyb3VnaCB0aGUgdGl0bGVzIHNldCB2aWEgZ2xvYmFsIGNvbmZpZ3NcbiAgICBjb25zdCB0aXRsZXMgPSB0aGlzLmNvbmZpZy50aXRsZXMgfHwge307XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gTmd4Q29vbERpYWxvZ1R5cGUuQWxlcnQpIHtcbiAgICAgIHRpdGxlID0gdGl0bGVzLmFsZXJ0O1xuICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSBOZ3hDb29sRGlhbG9nVHlwZS5Db25maXJtKSB7XG4gICAgICB0aXRsZSA9IHRpdGxlcy5jb25maXJtO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZSA9IHRpdGxlcy5wcm9tcHQ7XG4gICAgfVxuICAgIHJldHVybiB0aXRsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wb25lbnQgY2xlYW51cC4gcmV0dXJuIHRoZSBmb2N1cyB0byB0aGUgZWxlbWVudCB0aGF0IHdhcyBhY3RpdmVcbiAgICogcHJpb3IgdG8gdGhlIHBvcHVwIG9wZW5pbmdcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGVsV2l0aEZvY3VzID0gdGhpcy5lbFdpdGhGb2N1cztcblxuICAgIGxldCBlbGVtZW50VG9Gb2N1cztcbiAgICBpZiAoZWxXaXRoRm9jdXMgJiYgZWxXaXRoRm9jdXMuZm9jdXMgJiYgYm9keS5jb250YWlucyhlbFdpdGhGb2N1cykpIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gZWxXaXRoRm9jdXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnRUb0ZvY3VzID0gYm9keTtcbiAgICB9XG4gICAgZWxlbWVudFRvRm9jdXMuZm9jdXMoKTtcbiAgICB0aGlzLmVsV2l0aEZvY3VzID0gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaWxsIGNvbG9yIG9mIHRoZSAnT0snIGJ1dHRvblxuICAgKi9cbiAgZ2V0T2tCdXR0b25UZXh0Q29sb3IoKTogc3RyaW5nIHtcbiAgICAvLyBvbmx5IGZvciBtYXRlcmlhbCB0aGVtZSB0aGUgJ09LJyBoYXMgYSBjb2xvciBkaWZmZXJlbnQgdGhhbiB3aGl0ZVxuICAgIGlmICh0aGlzLnRoZW1lID09PSAnbWF0ZXJpYWwnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpbGwgY29sb3Igb2YgdGhlICdPSycgYnV0dG9uXG4gICAqL1xuICBnZXRPa0J1dHRvbkZpbGxDb2xvcigpOiBzdHJpbmcge1xuICAgIC8vIG1hdGVyaWFsIHRoZW1lIGRvZXNuJ3QgaGF2ZSBmaWxsZWQgYnV0dG9uc1xuICAgIGlmICh0aGlzLnRoZW1lICE9PSAnbWF0ZXJpYWwnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGJvcmRlciBjb2xvciBvZiB0aGUgJ0NhbmNlbCcgYnV0dG9uXG4gICAqL1xuICBnZXRDYW5jZWxCdXR0b25Cb3JkZXJDb2xvcigpOiBzdHJpbmcge1xuICAgIC8vIG1hdGVyaWFsIHRoZW1lIGRvZXNuJ3QgaGF2ZSBib3JkZXJcbiAgICBpZiAodGhpcy50aGVtZSAhPT0gJ21hdGVyaWFsJykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB0ZXh0IGNvbG9yIG9mIHRoZSAnQ2FuY2VsJyBidXR0b25cbiAgICovXG4gIGdldENhbmNlbEJ1dHRvblRleHRDb2xvcigpOiBzdHJpbmcge1xuICAgIC8vIGZvciBkYXJrIHRoZW1lIHRoZSB0ZXh0IHNob3VsZCBhbHdheXMgYmUgd2hpdGVcbiAgICBpZiAodGhpcy50aGVtZSAhPT0gJ2RhcmsnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuY29sb3I7XG4gICAgfVxuICB9XG59XG4iXX0=