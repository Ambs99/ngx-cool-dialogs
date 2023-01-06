import { __decorate, __param } from "tslib";
import { NgxCoolDialogsBaseConfig, } from './ngx-cool-dialogs.config';
import { fadeInOut } from './ngx-cool-dialogs.animation';
import { NgxCoolDialogType } from './ngx-cool-dialogs-types';
import { Component, HostBinding, ViewEncapsulation, Optional, Inject, ChangeDetectionStrategy, ViewChild, } from '@angular/core';
import { Subject } from 'rxjs';
import { NGX_COOL_DIALOGS_CONFIG } from './ngx-cool-dialogs.config';
import { DomSanitizer } from '@angular/platform-browser';
var NgxCoolDialog = /** @class */ (function () {
    //get theme(): NgxCoolDialogTheme {
    //  return this.config.theme;
    //}
    /**
     * Initializes the component
     * @param globalConfig - the configuration passed via .forRoot()
     */
    function NgxCoolDialog(globalConfig, sanitizer) {
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
    NgxCoolDialog.prototype.ngOnInit = function () {
        this.elWithFocus = document.activeElement;
        var defaultConfig = new NgxCoolDialogsBaseConfig();
        this._config = Object.assign({}, defaultConfig, this.globalConfig, this.localConfig);
        this.themeClass = "ngx-cool-dialog--" + this.theme + "-theme";
    };
    /**
     * Called after Angular initializes the component's views
     */
    NgxCoolDialog.prototype.ngAfterViewInit = function () {
        // set the focus to 'content' so that ESC can be listened right away
        this.popupContent.nativeElement.focus();
        // if the type is Prompt, then set the focus to the input and select
        // the text, just as window.prompt does
        if (this.type === NgxCoolDialogType.Prompt) {
            var input = this.promptInput.nativeElement;
            input.focus();
            var defaultText = this.config.defaultText;
            if (defaultText) {
                input.value = defaultText;
                input.setSelectionRange(0, defaultText.length);
            }
        }
    };
    /**
     * Listener for the 'esc' key
     */
    NgxCoolDialog.prototype.escKey = function () {
        this.close();
    };
    /**
     * Listener for the 'enter' key. It needs a fake 'debounce' otherwise
     * the popup would close immediately after it's opened, if it
     * was trigger via an 'enter' key prior to popup opening.
     */
    NgxCoolDialog.prototype.enterKey = function () {
        if (this.canListenToEnter) {
            this.close(true);
        }
    };
    /**
     * Closes the current popup. Emits an event with the payload.
     * The payload can either be a boolean, or an object if the type
     * is Prompt.
     * @param result - whether it was 'Cancel': false, or 'OK': true
     */
    NgxCoolDialog.prototype.close = function (result) {
        var _this = this;
        if (result === void 0) { result = false; }
        this.closing = true;
        requestAnimationFrame(function () {
            var payload;
            if (_this.type === NgxCoolDialogType.Prompt) {
                payload = {
                    result: result,
                    value: _this.promptInput.nativeElement.value || '',
                };
            }
            else {
                payload = result;
            }
            _this.closeSubject.next(payload);
        });
    };
    /**
     * Listener for click events on the 'x' button
     */
    NgxCoolDialog.prototype.onCloseBtnClick = function () {
        this.close();
    };
    /**
     * Function called when the main host animation finishes
     */
    NgxCoolDialog.prototype.animationDone = function () {
        this.canListenToEnter = true;
    };
    /**
     * Listener for click events on the 'OK' button
     */
    NgxCoolDialog.prototype.onOkBtnClick = function () {
        this.close(true);
    };
    /**
     * Listener for click events on the 'Cancel' button
     */
    NgxCoolDialog.prototype.onCancelBtnClick = function () {
        this.close();
    };
    /**
     * Listener for click events on the backdrop shadow
     */
    NgxCoolDialog.prototype.onBackdropClick = function () {
        this.close();
    };
    /**
     * The popup's title
     */
    NgxCoolDialog.prototype.getTitle = function () {
        // if a generic title exists, then use that
        var title = this.config.title;
        if (title) {
            return title;
        }
        // if no title was passed on `open()`, then search
        // through the titles set via global configs
        var titles = this.config.titles || {};
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
    };
    /**
     * Component cleanup. return the focus to the element that was active
     * prior to the popup opening
     */
    NgxCoolDialog.prototype.ngOnDestroy = function () {
        var body = document.body;
        var elWithFocus = this.elWithFocus;
        var elementToFocus;
        if (elWithFocus && elWithFocus.focus && body.contains(elWithFocus)) {
            elementToFocus = elWithFocus;
        }
        else {
            elementToFocus = body;
        }
        elementToFocus.focus();
        this.elWithFocus = null;
    };
    /**
     * Returns the fill color of the 'OK' button
     */
    NgxCoolDialog.prototype.getOkButtonTextColor = function () {
        // only for material theme the 'OK' has a color different than white
        if (this.theme === 'material') {
            return this.config.color;
        }
    };
    /**
     * Returns the fill color of the 'OK' button
     */
    NgxCoolDialog.prototype.getOkButtonFillColor = function () {
        // material theme doesn't have filled buttons
        if (this.theme !== 'material') {
            return this.config.color;
        }
    };
    /**
     * Returns the border color of the 'Cancel' button
     */
    NgxCoolDialog.prototype.getCancelButtonBorderColor = function () {
        // material theme doesn't have border
        if (this.theme !== 'material') {
            return this.config.color;
        }
    };
    /**
     * Returns the text color of the 'Cancel' button
     */
    NgxCoolDialog.prototype.getCancelButtonTextColor = function () {
        // for dark theme the text should always be white
        if (this.theme !== 'dark') {
            return this.config.color;
        }
    };
    NgxCoolDialog.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_COOL_DIALOGS_CONFIG,] }] },
        { type: DomSanitizer }
    ]; };
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
    return NgxCoolDialog;
}());
export { NgxCoolDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvb2wtZGlhbG9ncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jb29sLWRpYWxvZ3MvIiwic291cmNlcyI6WyJsaWIvbmd4LWNvb2wtZGlhbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUlMLHdCQUF3QixHQUN6QixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEYsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsaUJBQWlCLEVBRWpCLFFBQVEsRUFDUixNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLFNBQVMsR0FJVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQWF6RDtJQStGRSxtQ0FBbUM7SUFDbkMsNkJBQTZCO0lBQzdCLEdBQUc7SUFFSDs7O09BR0c7SUFDSCx1QkFHVSxZQUF3QyxFQUFTLFNBQXVCO1FBQXhFLGlCQUFZLEdBQVosWUFBWSxDQUE0QjtRQUFTLGNBQVMsR0FBVCxTQUFTLENBQWM7UUF6R2xGOztXQUVHO1FBQ0ssaUJBQVksR0FBaUQsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUVuRjs7V0FFRztRQUNILFdBQU0sR0FFRixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBT3JDOztXQUVHO1FBQ0gsVUFBSyxHQUFHLGlCQUFpQixDQUFDO1FBTzFCOztXQUVHO1FBQ0gsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUVoQjs7V0FFRztRQUNILHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQU96Qjs7V0FFRztRQUVILGNBQVMsR0FB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QWlCO2FBQ3ZDO1lBQ0QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7WUFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07O1NBQ2hELENBQUM7UUF5R0csV0FBQSxRQUFRLEVBQUUsQ0FBQTtRQUNWLFdBQUEsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUE7T0F6R3ZCLGFBQWEsQ0EyU3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTNTRCxJQTJTQztTQTNTWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgTmd4Q29vbERpYWxvZ3NMb2NhbENvbmZpZyxcbiAgTmd4Q29vbERpYWxvZ3NDb21wbGV0ZUNvbmZpZyxcbiAgTmd4Q29vbERpYWxvZ3NHbG9iYWxDb25maWcsXG4gIE5neENvb2xEaWFsb2dzQmFzZUNvbmZpZyxcbn0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLmNvbmZpZyc7XG5pbXBvcnQgeyBOZ3hDb29sRGlhbG9nVGhlbWUgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MtdGhlbWUnO1xuaW1wb3J0IHsgZmFkZUluT3V0IH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLmFuaW1hdGlvbic7XG5pbXBvcnQgeyBOZ3hDb29sRGlhbG9nVHlwZSwgTmd4Q29vbERpYWxvZ1Byb21wdFJlc3VsdCB9IGZyb20gJy4vbmd4LWNvb2wtZGlhbG9ncy10eXBlcyc7XG5pbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEhvc3RCaW5kaW5nLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbiAgT25Jbml0LFxuICBPcHRpb25hbCxcbiAgSW5qZWN0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgVmlld0NoaWxkLFxuICBFbGVtZW50UmVmLFxuICBBZnRlclZpZXdJbml0LFxuICBPbkRlc3Ryb3ksXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTkdYX0NPT0xfRElBTE9HU19DT05GSUcgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MuY29uZmlnJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY29vbC1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vbmd4LWNvb2wtZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtY29vbC1kaWFsb2cuc2NzcyddLFxuICBhbmltYXRpb25zOiBbZmFkZUluT3V0XSxcbiAgaG9zdDoge1xuICAgICcoQGZhZGVJbk91dC5kb25lKSc6ICdhbmltYXRpb25Eb25lKCknLFxuICB9LFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgTmd4Q29vbERpYWxvZyBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIFN1YmplY3QgdXNlZCB0byBzdHJlYW0gY2xvc2UgZXZlbnRzXG4gICAqL1xuICBwcml2YXRlIGNsb3NlU3ViamVjdDogU3ViamVjdDxib29sZWFuIHwgTmd4Q29vbERpYWxvZ1Byb21wdFJlc3VsdD4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIC8qKlxuICAgKiBPYnNlcnZhYmxlIHRoYXQgZW1pdHMgb24gZXZlcnkgY2xvc2UgYWN0aW9uXG4gICAqL1xuICAkY2xvc2U6IE9ic2VydmFibGU8XG4gICAgYm9vbGVhbiB8IE5neENvb2xEaWFsb2dQcm9tcHRSZXN1bHRcbiAgPiA9IHRoaXMuY2xvc2VTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiB0aGUgcG9wdXBcbiAgICovXG4gIHR5cGU6IE5neENvb2xEaWFsb2dUeXBlO1xuXG4gIC8qKlxuICAgKiBMaXN0IG9mIGFsbCB0aGUgYXZhaWxhYmxlIGRpYWxnIHR5cGVzXG4gICAqL1xuICB0eXBlcyA9IE5neENvb2xEaWFsb2dUeXBlO1xuXG4gIC8qKlxuICAgKiBNYWluIHRleHQgdG8gcmVuZGVyIGluc2lkZSB0aGUgcG9wdXBcbiAgICovXG4gIG1lc3NhZ2U6IHN0cmluZztcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdGhlIHBvcHVwIGlzIGNsb3NpbmdcbiAgICovXG4gIGNsb3NpbmcgPSBmYWxzZTtcblxuICAvKipcbiAgICogV2hldGhlciBvciBub3QgdG8gbGlzdGVuIHRvICdlbnRlcicga2V5XG4gICAqL1xuICBjYW5MaXN0ZW5Ub0VudGVyID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEVsZW1lbnQgdGhhdCBpcyBmb2N1c2VkIHByaW9yIHRvIG1vZGFsIG9wZW5pbmdcbiAgICovXG4gIHByaXZhdGUgZWxXaXRoRm9jdXM6IEhUTUxFbGVtZW50O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0byBlbmFibGUgaG9zdCBhbmltYXRpb25cbiAgICovXG4gIEBIb3N0QmluZGluZygnQGZhZGVJbk91dCcpXG4gIGFuaW1hdGlvbiA9IHRydWU7XG5cbiAgLyoqXG4gICAqIENsYXNzIHRvIGJlIGFwcGxpZWQgYWNjb3JkaW5nIHRvIHRoZSBkZXNpcmVkIHRoZW1lXG4gICAqL1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgdGhlbWVDbGFzczogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIHByb21wdCB0ZXh0IGlucHV0XG4gICAqL1xuICBAVmlld0NoaWxkKCdwcm9tcHRJbnB1dCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwcm9tcHRJbnB1dDogRWxlbWVudFJlZjtcblxuICAvKipcbiAgICogUmVmZXJlbmNlIHRvIHRoZSBwb3B1cCBjb250ZW50XG4gICAqL1xuICBAVmlld0NoaWxkKCdwb3B1cENvbnRlbnQnLCB7IHN0YXRpYzogZmFsc2UgfSlcbiAgcG9wdXBDb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0byBzZXQgdGhlIGhvc3QgY2xhc3NcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3Mubmd4LWNvb2wtZGlhbG9nJylcbiAgc2V0SG9zdENsYXNzID0gdHJ1ZTtcblxuICAvKipcbiAgICogVGhlIGNvbmZpZyBwYXNzZWQgYnkgdGhlIHVzZXIgdmlhIHNlcnZpY2UgbWV0aG9kc1xuICAgKi9cbiAgbG9jYWxDb25maWc6IE5neENvb2xEaWFsb2dzTG9jYWxDb25maWc7XG5cbiAgLyoqXG4gICAqIE1hcHBlZCBjb25maWcgdGhhdCBibGVuZHMgYm90aCBsb2NhbCBhbmQgZ2xvYmFsIGNvbmZpZ3NcbiAgICovXG4gIHByaXZhdGUgX2NvbmZpZzogTmd4Q29vbERpYWxvZ3NDb21wbGV0ZUNvbmZpZztcblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgbWFwcGVkIGNvbmZpZ1xuICAgKi9cbiAgcmVhZG9ubHkgY29uZmlnOiBOZ3hDb29sRGlhbG9nc0NvbXBsZXRlQ29uZmlnIFxuICAvL2dldCBjb25maWcoKTogTmd4Q29vbERpYWxvZ3NDb21wbGV0ZUNvbmZpZyB7XG4gIC8vICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICAvL31cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdGhlbWVcbiAgICovXG4gIHJlYWRvbmx5IHRoZW1lOiBOZ3hDb29sRGlhbG9nVGhlbWUgXG4gIC8vZ2V0IHRoZW1lKCk6IE5neENvb2xEaWFsb2dUaGVtZSB7XG4gIC8vICByZXR1cm4gdGhpcy5jb25maWcudGhlbWU7XG4gIC8vfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50XG4gICAqIEBwYXJhbSBnbG9iYWxDb25maWcgLSB0aGUgY29uZmlndXJhdGlvbiBwYXNzZWQgdmlhIC5mb3JSb290KClcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChOR1hfQ09PTF9ESUFMT0dTX0NPTkZJRylcbiAgICBwcml2YXRlIGdsb2JhbENvbmZpZzogTmd4Q29vbERpYWxvZ3NHbG9iYWxDb25maWcsIHB1YmxpYyBzYW5pdGl6ZXI6IERvbVNhbml0aXplclxuICApIHt9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQgd2l0aCB0aGUgdGhlbWUgYW5kIG1hcHBlZCBjb25maWdzXG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmVsV2l0aEZvY3VzID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gbmV3IE5neENvb2xEaWFsb2dzQmFzZUNvbmZpZygpO1xuICAgIHRoaXMuX2NvbmZpZyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIGRlZmF1bHRDb25maWcsXG4gICAgICB0aGlzLmdsb2JhbENvbmZpZyxcbiAgICAgIHRoaXMubG9jYWxDb25maWdcbiAgICApO1xuICAgIHRoaXMudGhlbWVDbGFzcyA9IGBuZ3gtY29vbC1kaWFsb2ctLSR7dGhpcy50aGVtZX0tdGhlbWVgO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxlZCBhZnRlciBBbmd1bGFyIGluaXRpYWxpemVzIHRoZSBjb21wb25lbnQncyB2aWV3c1xuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8vIHNldCB0aGUgZm9jdXMgdG8gJ2NvbnRlbnQnIHNvIHRoYXQgRVNDIGNhbiBiZSBsaXN0ZW5lZCByaWdodCBhd2F5XG4gICAgdGhpcy5wb3B1cENvbnRlbnQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuXG4gICAgLy8gaWYgdGhlIHR5cGUgaXMgUHJvbXB0LCB0aGVuIHNldCB0aGUgZm9jdXMgdG8gdGhlIGlucHV0IGFuZCBzZWxlY3RcbiAgICAvLyB0aGUgdGV4dCwganVzdCBhcyB3aW5kb3cucHJvbXB0IGRvZXNcbiAgICBpZiAodGhpcy50eXBlID09PSBOZ3hDb29sRGlhbG9nVHlwZS5Qcm9tcHQpIHtcbiAgICAgIGNvbnN0IGlucHV0ID0gdGhpcy5wcm9tcHRJbnB1dC5uYXRpdmVFbGVtZW50IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgY29uc3QgZGVmYXVsdFRleHQgPSB0aGlzLmNvbmZpZy5kZWZhdWx0VGV4dDtcbiAgICAgIGlmIChkZWZhdWx0VGV4dCkge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IGRlZmF1bHRUZXh0O1xuICAgICAgICBpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSgwLCBkZWZhdWx0VGV4dC5sZW5ndGgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgdGhlICdlc2MnIGtleVxuICAgKi9cbiAgZXNjS2V5KCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgdGhlICdlbnRlcicga2V5LiBJdCBuZWVkcyBhIGZha2UgJ2RlYm91bmNlJyBvdGhlcndpc2VcbiAgICogdGhlIHBvcHVwIHdvdWxkIGNsb3NlIGltbWVkaWF0ZWx5IGFmdGVyIGl0J3Mgb3BlbmVkLCBpZiBpdFxuICAgKiB3YXMgdHJpZ2dlciB2aWEgYW4gJ2VudGVyJyBrZXkgcHJpb3IgdG8gcG9wdXAgb3BlbmluZy5cbiAgICovXG4gIGVudGVyS2V5KCkge1xuICAgIGlmICh0aGlzLmNhbkxpc3RlblRvRW50ZXIpIHtcbiAgICAgIHRoaXMuY2xvc2UodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgY3VycmVudCBwb3B1cC4gRW1pdHMgYW4gZXZlbnQgd2l0aCB0aGUgcGF5bG9hZC5cbiAgICogVGhlIHBheWxvYWQgY2FuIGVpdGhlciBiZSBhIGJvb2xlYW4sIG9yIGFuIG9iamVjdCBpZiB0aGUgdHlwZVxuICAgKiBpcyBQcm9tcHQuXG4gICAqIEBwYXJhbSByZXN1bHQgLSB3aGV0aGVyIGl0IHdhcyAnQ2FuY2VsJzogZmFsc2UsIG9yICdPSyc6IHRydWVcbiAgICovXG4gIGNsb3NlKHJlc3VsdCA9IGZhbHNlKSB7XG4gICAgdGhpcy5jbG9zaW5nID0gdHJ1ZTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgbGV0IHBheWxvYWQ7XG4gICAgICBpZiAodGhpcy50eXBlID09PSBOZ3hDb29sRGlhbG9nVHlwZS5Qcm9tcHQpIHtcbiAgICAgICAgcGF5bG9hZCA9IHtcbiAgICAgICAgICByZXN1bHQsXG4gICAgICAgICAgdmFsdWU6IHRoaXMucHJvbXB0SW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSB8fCAnJyxcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBheWxvYWQgPSByZXN1bHQ7XG4gICAgICB9XG4gICAgICB0aGlzLmNsb3NlU3ViamVjdC5uZXh0KHBheWxvYWQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBjbGljayBldmVudHMgb24gdGhlICd4JyBidXR0b25cbiAgICovXG4gIG9uQ2xvc2VCdG5DbGljaygpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogRnVuY3Rpb24gY2FsbGVkIHdoZW4gdGhlIG1haW4gaG9zdCBhbmltYXRpb24gZmluaXNoZXNcbiAgICovXG4gIGFuaW1hdGlvbkRvbmUoKSB7XG4gICAgdGhpcy5jYW5MaXN0ZW5Ub0VudGVyID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSAnT0snIGJ1dHRvblxuICAgKi9cbiAgb25Pa0J0bkNsaWNrKCkge1xuICAgIHRoaXMuY2xvc2UodHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgJ0NhbmNlbCcgYnV0dG9uXG4gICAqL1xuICBvbkNhbmNlbEJ0bkNsaWNrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSBiYWNrZHJvcCBzaGFkb3dcbiAgICovXG4gIG9uQmFja2Ryb3BDbGljaygpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHBvcHVwJ3MgdGl0bGVcbiAgICovXG4gIGdldFRpdGxlKCkge1xuICAgIC8vIGlmIGEgZ2VuZXJpYyB0aXRsZSBleGlzdHMsIHRoZW4gdXNlIHRoYXRcbiAgICBsZXQgdGl0bGUgPSB0aGlzLmNvbmZpZy50aXRsZTtcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIHJldHVybiB0aXRsZTtcbiAgICB9XG5cbiAgICAvLyBpZiBubyB0aXRsZSB3YXMgcGFzc2VkIG9uIGBvcGVuKClgLCB0aGVuIHNlYXJjaFxuICAgIC8vIHRocm91Z2ggdGhlIHRpdGxlcyBzZXQgdmlhIGdsb2JhbCBjb25maWdzXG4gICAgY29uc3QgdGl0bGVzID0gdGhpcy5jb25maWcudGl0bGVzIHx8IHt9O1xuICAgIGlmICh0aGlzLnR5cGUgPT09IE5neENvb2xEaWFsb2dUeXBlLkFsZXJ0KSB7XG4gICAgICB0aXRsZSA9IHRpdGxlcy5hbGVydDtcbiAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gTmd4Q29vbERpYWxvZ1R5cGUuQ29uZmlybSkge1xuICAgICAgdGl0bGUgPSB0aXRsZXMuY29uZmlybTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGUgPSB0aXRsZXMucHJvbXB0O1xuICAgIH1cbiAgICByZXR1cm4gdGl0bGU7XG4gIH1cblxuICAvKipcbiAgICogQ29tcG9uZW50IGNsZWFudXAuIHJldHVybiB0aGUgZm9jdXMgdG8gdGhlIGVsZW1lbnQgdGhhdCB3YXMgYWN0aXZlXG4gICAqIHByaW9yIHRvIHRoZSBwb3B1cCBvcGVuaW5nXG4gICAqL1xuICBuZ09uRGVzdHJveSgpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBlbFdpdGhGb2N1cyA9IHRoaXMuZWxXaXRoRm9jdXM7XG5cbiAgICBsZXQgZWxlbWVudFRvRm9jdXM7XG4gICAgaWYgKGVsV2l0aEZvY3VzICYmIGVsV2l0aEZvY3VzLmZvY3VzICYmIGJvZHkuY29udGFpbnMoZWxXaXRoRm9jdXMpKSB7XG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGVsV2l0aEZvY3VzO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50VG9Gb2N1cyA9IGJvZHk7XG4gICAgfVxuICAgIGVsZW1lbnRUb0ZvY3VzLmZvY3VzKCk7XG4gICAgdGhpcy5lbFdpdGhGb2N1cyA9IG51bGw7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlsbCBjb2xvciBvZiB0aGUgJ09LJyBidXR0b25cbiAgICovXG4gIGdldE9rQnV0dG9uVGV4dENvbG9yKCk6IHN0cmluZyB7XG4gICAgLy8gb25seSBmb3IgbWF0ZXJpYWwgdGhlbWUgdGhlICdPSycgaGFzIGEgY29sb3IgZGlmZmVyZW50IHRoYW4gd2hpdGVcbiAgICBpZiAodGhpcy50aGVtZSA9PT0gJ21hdGVyaWFsJykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaWxsIGNvbG9yIG9mIHRoZSAnT0snIGJ1dHRvblxuICAgKi9cbiAgZ2V0T2tCdXR0b25GaWxsQ29sb3IoKTogc3RyaW5nIHtcbiAgICAvLyBtYXRlcmlhbCB0aGVtZSBkb2Vzbid0IGhhdmUgZmlsbGVkIGJ1dHRvbnNcbiAgICBpZiAodGhpcy50aGVtZSAhPT0gJ21hdGVyaWFsJykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBib3JkZXIgY29sb3Igb2YgdGhlICdDYW5jZWwnIGJ1dHRvblxuICAgKi9cbiAgZ2V0Q2FuY2VsQnV0dG9uQm9yZGVyQ29sb3IoKTogc3RyaW5nIHtcbiAgICAvLyBtYXRlcmlhbCB0aGVtZSBkb2Vzbid0IGhhdmUgYm9yZGVyXG4gICAgaWYgKHRoaXMudGhlbWUgIT09ICdtYXRlcmlhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2xvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgdGV4dCBjb2xvciBvZiB0aGUgJ0NhbmNlbCcgYnV0dG9uXG4gICAqL1xuICBnZXRDYW5jZWxCdXR0b25UZXh0Q29sb3IoKTogc3RyaW5nIHtcbiAgICAvLyBmb3IgZGFyayB0aGVtZSB0aGUgdGV4dCBzaG91bGQgYWx3YXlzIGJlIHdoaXRlXG4gICAgaWYgKHRoaXMudGhlbWUgIT09ICdkYXJrJykge1xuICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmNvbG9yO1xuICAgIH1cbiAgfVxufVxuIl19