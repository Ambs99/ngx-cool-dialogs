import { __decorate, __param } from "tslib";
import { NgxCoolDialogsBaseConfig, } from './ngx-cool-dialogs.config';
import { fadeInOut } from './ngx-cool-dialogs.animation';
import { NgxCoolDialogType } from './ngx-cool-dialogs-types';
import { Component, HostBinding, ViewEncapsulation, Optional, Inject, ChangeDetectionStrategy, ViewChild, } from '@angular/core';
import { Subject } from 'rxjs';
import { NGX_COOL_DIALOGS_CONFIG } from './ngx-cool-dialogs.config';
var NgxCoolDialog = /** @class */ (function () {
    /**
     * Initializes the component
     * @param globalConfig - the configuration passed via .forRoot()
     */
    function NgxCoolDialog(globalConfig) {
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
    Object.defineProperty(NgxCoolDialog.prototype, "config", {
        /**
         * The current mapped config
         */
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgxCoolDialog.prototype, "theme", {
        /**
         * The current theme
         */
        get: function () {
            return this.config.theme;
        },
        enumerable: true,
        configurable: true
    });
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
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_COOL_DIALOGS_CONFIG,] }] }
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
    return NgxCoolDialog;
}());
export { NgxCoolDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvb2wtZGlhbG9ncy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1jb29sLWRpYWxvZ3MvIiwic291cmNlcyI6WyJsaWIvbmd4LWNvb2wtZGlhbG9ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUlMLHdCQUF3QixHQUN6QixNQUFNLDJCQUEyQixDQUFDO0FBRW5DLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQTZCLE1BQU0sMEJBQTBCLENBQUM7QUFDeEYsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsaUJBQWlCLEVBRWpCLFFBQVEsRUFDUixNQUFNLEVBQ04sdUJBQXVCLEVBQ3ZCLFNBQVMsR0FJVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBYXBFO0lBaUdFOzs7T0FHRztJQUNILHVCQUdVLFlBQXdDO1FBQXhDLGlCQUFZLEdBQVosWUFBWSxDQUE0QjtRQXZHbEQ7O1dBRUc7UUFDSyxpQkFBWSxHQUFpRCxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRW5GOztXQUVHO1FBQ0gsV0FBTSxHQUVGLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFLENBQUM7UUFPckM7O1dBRUc7UUFDSCxVQUFLLEdBQUcsaUJBQWlCLENBQUM7UUFPMUI7O1dBRUc7UUFDSCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRWhCOztXQUVHO1FBQ0gscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBT3pCOztXQUVHO1FBRUgsY0FBUyxHQUFHLElBQUksQ0FBQztRQW9CakI7O1dBRUc7UUFFSCxpQkFBWSxHQUFHLElBQUksQ0FBQztJQWtDakIsQ0FBQztJQW5CSixzQkFBSSxpQ0FBTTtRQUhWOztXQUVHO2FBQ0g7WUFDRSxPQUFPLElBQUksQ0FB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QUFTLENBQUM7WUFDdkIsSUFBSSxFQUFFO2dCQUNKLG1CQUFtQixFQUFFLGlCQUFpQjthQUN2QztZQUNELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO1lBQ3JDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNOztTQUNoRCxDQUFDO1FBdUdHLFdBQUEsUUFBUSxFQUFFLENBQUE7UUFDVixXQUFBLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO09Bdkd2QixhQUFhLENBeVN6QjtJQUFELG9CQUFDO0NBQUEsQUF6U0QsSUF5U0M7U0F6U1ksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIE5neENvb2xEaWFsb2dzTG9jYWxDb25maWcsXG4gIE5neENvb2xEaWFsb2dzQ29tcGxldGVDb25maWcsXG4gIE5neENvb2xEaWFsb2dzR2xvYmFsQ29uZmlnLFxuICBOZ3hDb29sRGlhbG9nc0Jhc2VDb25maWcsXG59IGZyb20gJy4vbmd4LWNvb2wtZGlhbG9ncy5jb25maWcnO1xuaW1wb3J0IHsgTmd4Q29vbERpYWxvZ1RoZW1lIH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLXRoZW1lJztcbmltcG9ydCB7IGZhZGVJbk91dCB9IGZyb20gJy4vbmd4LWNvb2wtZGlhbG9ncy5hbmltYXRpb24nO1xuaW1wb3J0IHsgTmd4Q29vbERpYWxvZ1R5cGUsIE5neENvb2xEaWFsb2dQcm9tcHRSZXN1bHQgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MtdHlwZXMnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIE9uSW5pdCxcbiAgT3B0aW9uYWwsXG4gIEluamVjdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgT25EZXN0cm95LFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE5HWF9DT09MX0RJQUxPR1NfQ09ORklHIH0gZnJvbSAnLi9uZ3gtY29vbC1kaWFsb2dzLmNvbmZpZyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1jb29sLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9uZ3gtY29vbC1kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL25neC1jb29sLWRpYWxvZy5zY3NzJ10sXG4gIGFuaW1hdGlvbnM6IFtmYWRlSW5PdXRdLFxuICBob3N0OiB7XG4gICAgJyhAZmFkZUluT3V0LmRvbmUpJzogJ2FuaW1hdGlvbkRvbmUoKScsXG4gIH0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBOZ3hDb29sRGlhbG9nIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogU3ViamVjdCB1c2VkIHRvIHN0cmVhbSBjbG9zZSBldmVudHNcbiAgICovXG4gIHByaXZhdGUgY2xvc2VTdWJqZWN0OiBTdWJqZWN0PGJvb2xlYW4gfCBOZ3hDb29sRGlhbG9nUHJvbXB0UmVzdWx0PiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgLyoqXG4gICAqIE9ic2VydmFibGUgdGhhdCBlbWl0cyBvbiBldmVyeSBjbG9zZSBhY3Rpb25cbiAgICovXG4gICRjbG9zZTogT2JzZXJ2YWJsZTxcbiAgICBib29sZWFuIHwgTmd4Q29vbERpYWxvZ1Byb21wdFJlc3VsdFxuICA+ID0gdGhpcy5jbG9zZVN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLyoqXG4gICAqIFRoZSB0eXBlIG9mIHRoZSBwb3B1cFxuICAgKi9cbiAgdHlwZTogTmd4Q29vbERpYWxvZ1R5cGU7XG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgYWxsIHRoZSBhdmFpbGFibGUgZGlhbGcgdHlwZXNcbiAgICovXG4gIHR5cGVzID0gTmd4Q29vbERpYWxvZ1R5cGU7XG5cbiAgLyoqXG4gICAqIE1haW4gdGV4dCB0byByZW5kZXIgaW5zaWRlIHRoZSBwb3B1cFxuICAgKi9cbiAgbWVzc2FnZTogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0aGUgcG9wdXAgaXMgY2xvc2luZ1xuICAgKi9cbiAgY2xvc2luZyA9IGZhbHNlO1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIG9yIG5vdCB0byBsaXN0ZW4gdG8gJ2VudGVyJyBrZXlcbiAgICovXG4gIGNhbkxpc3RlblRvRW50ZXIgPSBmYWxzZTtcblxuICAvKipcbiAgICogRWxlbWVudCB0aGF0IGlzIGZvY3VzZWQgcHJpb3IgdG8gbW9kYWwgb3BlbmluZ1xuICAgKi9cbiAgcHJpdmF0ZSBlbFdpdGhGb2N1czogSFRNTEVsZW1lbnQ7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRvIGVuYWJsZSBob3N0IGFuaW1hdGlvblxuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdAZmFkZUluT3V0JylcbiAgYW5pbWF0aW9uID0gdHJ1ZTtcblxuICAvKipcbiAgICogQ2xhc3MgdG8gYmUgYXBwbGllZCBhY2NvcmRpbmcgdG8gdGhlIGRlc2lyZWQgdGhlbWVcbiAgICovXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICB0aGVtZUNsYXNzOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFJlZmVyZW5jZSB0byB0aGUgcHJvbXB0IHRleHQgaW5wdXRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3Byb21wdElucHV0JywgeyBzdGF0aWM6IGZhbHNlIH0pXG4gIHByb21wdElucHV0OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBSZWZlcmVuY2UgdG8gdGhlIHBvcHVwIGNvbnRlbnRcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3BvcHVwQ29udGVudCcsIHsgc3RhdGljOiBmYWxzZSB9KVxuICBwb3B1cENvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgb3Igbm90IHRvIHNldCB0aGUgaG9zdCBjbGFzc1xuICAgKi9cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5uZ3gtY29vbC1kaWFsb2cnKVxuICBzZXRIb3N0Q2xhc3MgPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBUaGUgY29uZmlnIHBhc3NlZCBieSB0aGUgdXNlciB2aWEgc2VydmljZSBtZXRob2RzXG4gICAqL1xuICBsb2NhbENvbmZpZzogTmd4Q29vbERpYWxvZ3NMb2NhbENvbmZpZztcblxuICAvKipcbiAgICogTWFwcGVkIGNvbmZpZyB0aGF0IGJsZW5kcyBib3RoIGxvY2FsIGFuZCBnbG9iYWwgY29uZmlnc1xuICAgKi9cbiAgcHJpdmF0ZSBfY29uZmlnOiBOZ3hDb29sRGlhbG9nc0NvbXBsZXRlQ29uZmlnO1xuXG4gIC8qKlxuICAgKiBUaGUgY3VycmVudCBtYXBwZWQgY29uZmlnXG4gICAqL1xuICBnZXQgY29uZmlnKCk6IE5neENvb2xEaWFsb2dzQ29tcGxldGVDb25maWcge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGN1cnJlbnQgdGhlbWVcbiAgICovXG4gIGdldCB0aGVtZSgpOiBOZ3hDb29sRGlhbG9nVGhlbWUge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy50aGVtZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50XG4gICAqIEBwYXJhbSBnbG9iYWxDb25maWcgLSB0aGUgY29uZmlndXJhdGlvbiBwYXNzZWQgdmlhIC5mb3JSb290KClcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpXG4gICAgQEluamVjdChOR1hfQ09PTF9ESUFMT0dTX0NPTkZJRylcbiAgICBwcml2YXRlIGdsb2JhbENvbmZpZzogTmd4Q29vbERpYWxvZ3NHbG9iYWxDb25maWdcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50IHdpdGggdGhlIHRoZW1lIGFuZCBtYXBwZWQgY29uZmlnc1xuICAgKi9cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5lbFdpdGhGb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IG5ldyBOZ3hDb29sRGlhbG9nc0Jhc2VDb25maWcoKTtcbiAgICB0aGlzLl9jb25maWcgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICBkZWZhdWx0Q29uZmlnLFxuICAgICAgdGhpcy5nbG9iYWxDb25maWcsXG4gICAgICB0aGlzLmxvY2FsQ29uZmlnXG4gICAgKTtcbiAgICB0aGlzLnRoZW1lQ2xhc3MgPSBgbmd4LWNvb2wtZGlhbG9nLS0ke3RoaXMudGhlbWV9LXRoZW1lYDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsZWQgYWZ0ZXIgQW5ndWxhciBpbml0aWFsaXplcyB0aGUgY29tcG9uZW50J3Mgdmlld3NcbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAvLyBzZXQgdGhlIGZvY3VzIHRvICdjb250ZW50JyBzbyB0aGF0IEVTQyBjYW4gYmUgbGlzdGVuZWQgcmlnaHQgYXdheVxuICAgIHRoaXMucG9wdXBDb250ZW50Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcblxuICAgIC8vIGlmIHRoZSB0eXBlIGlzIFByb21wdCwgdGhlbiBzZXQgdGhlIGZvY3VzIHRvIHRoZSBpbnB1dCBhbmQgc2VsZWN0XG4gICAgLy8gdGhlIHRleHQsIGp1c3QgYXMgd2luZG93LnByb21wdCBkb2VzXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gTmd4Q29vbERpYWxvZ1R5cGUuUHJvbXB0KSB7XG4gICAgICBjb25zdCBpbnB1dCA9IHRoaXMucHJvbXB0SW5wdXQubmF0aXZlRWxlbWVudCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgICAgaW5wdXQuZm9jdXMoKTtcbiAgICAgIGNvbnN0IGRlZmF1bHRUZXh0ID0gdGhpcy5jb25maWcuZGVmYXVsdFRleHQ7XG4gICAgICBpZiAoZGVmYXVsdFRleHQpIHtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBkZWZhdWx0VGV4dDtcbiAgICAgICAgaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgZGVmYXVsdFRleHQubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIHRoZSAnZXNjJyBrZXlcbiAgICovXG4gIGVzY0tleSgpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIHRoZSAnZW50ZXInIGtleS4gSXQgbmVlZHMgYSBmYWtlICdkZWJvdW5jZScgb3RoZXJ3aXNlXG4gICAqIHRoZSBwb3B1cCB3b3VsZCBjbG9zZSBpbW1lZGlhdGVseSBhZnRlciBpdCdzIG9wZW5lZCwgaWYgaXRcbiAgICogd2FzIHRyaWdnZXIgdmlhIGFuICdlbnRlcicga2V5IHByaW9yIHRvIHBvcHVwIG9wZW5pbmcuXG4gICAqL1xuICBlbnRlcktleSgpIHtcbiAgICBpZiAodGhpcy5jYW5MaXN0ZW5Ub0VudGVyKSB7XG4gICAgICB0aGlzLmNsb3NlKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZXMgdGhlIGN1cnJlbnQgcG9wdXAuIEVtaXRzIGFuIGV2ZW50IHdpdGggdGhlIHBheWxvYWQuXG4gICAqIFRoZSBwYXlsb2FkIGNhbiBlaXRoZXIgYmUgYSBib29sZWFuLCBvciBhbiBvYmplY3QgaWYgdGhlIHR5cGVcbiAgICogaXMgUHJvbXB0LlxuICAgKiBAcGFyYW0gcmVzdWx0IC0gd2hldGhlciBpdCB3YXMgJ0NhbmNlbCc6IGZhbHNlLCBvciAnT0snOiB0cnVlXG4gICAqL1xuICBjbG9zZShyZXN1bHQgPSBmYWxzZSkge1xuICAgIHRoaXMuY2xvc2luZyA9IHRydWU7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGxldCBwYXlsb2FkO1xuICAgICAgaWYgKHRoaXMudHlwZSA9PT0gTmd4Q29vbERpYWxvZ1R5cGUuUHJvbXB0KSB7XG4gICAgICAgIHBheWxvYWQgPSB7XG4gICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgIHZhbHVlOiB0aGlzLnByb21wdElucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgfHwgJycsXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXlsb2FkID0gcmVzdWx0O1xuICAgICAgfVxuICAgICAgdGhpcy5jbG9zZVN1YmplY3QubmV4dChwYXlsb2FkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMaXN0ZW5lciBmb3IgY2xpY2sgZXZlbnRzIG9uIHRoZSAneCcgYnV0dG9uXG4gICAqL1xuICBvbkNsb3NlQnRuQ2xpY2soKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIHRoZSBtYWluIGhvc3QgYW5pbWF0aW9uIGZpbmlzaGVzXG4gICAqL1xuICBhbmltYXRpb25Eb25lKCkge1xuICAgIHRoaXMuY2FuTGlzdGVuVG9FbnRlciA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgJ09LJyBidXR0b25cbiAgICovXG4gIG9uT2tCdG5DbGljaygpIHtcbiAgICB0aGlzLmNsb3NlKHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIExpc3RlbmVyIGZvciBjbGljayBldmVudHMgb24gdGhlICdDYW5jZWwnIGJ1dHRvblxuICAgKi9cbiAgb25DYW5jZWxCdG5DbGljaygpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogTGlzdGVuZXIgZm9yIGNsaWNrIGV2ZW50cyBvbiB0aGUgYmFja2Ryb3Agc2hhZG93XG4gICAqL1xuICBvbkJhY2tkcm9wQ2xpY2soKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBwb3B1cCdzIHRpdGxlXG4gICAqL1xuICBnZXRUaXRsZSgpIHtcbiAgICAvLyBpZiBhIGdlbmVyaWMgdGl0bGUgZXhpc3RzLCB0aGVuIHVzZSB0aGF0XG4gICAgbGV0IHRpdGxlID0gdGhpcy5jb25maWcudGl0bGU7XG4gICAgaWYgKHRpdGxlKSB7XG4gICAgICByZXR1cm4gdGl0bGU7XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gdGl0bGUgd2FzIHBhc3NlZCBvbiBgb3BlbigpYCwgdGhlbiBzZWFyY2hcbiAgICAvLyB0aHJvdWdoIHRoZSB0aXRsZXMgc2V0IHZpYSBnbG9iYWwgY29uZmlnc1xuICAgIGNvbnN0IHRpdGxlcyA9IHRoaXMuY29uZmlnLnRpdGxlcyB8fCB7fTtcbiAgICBpZiAodGhpcy50eXBlID09PSBOZ3hDb29sRGlhbG9nVHlwZS5BbGVydCkge1xuICAgICAgdGl0bGUgPSB0aXRsZXMuYWxlcnQ7XG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09IE5neENvb2xEaWFsb2dUeXBlLkNvbmZpcm0pIHtcbiAgICAgIHRpdGxlID0gdGl0bGVzLmNvbmZpcm07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlID0gdGl0bGVzLnByb21wdDtcbiAgICB9XG4gICAgcmV0dXJuIHRpdGxlO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBvbmVudCBjbGVhbnVwLiByZXR1cm4gdGhlIGZvY3VzIHRvIHRoZSBlbGVtZW50IHRoYXQgd2FzIGFjdGl2ZVxuICAgKiBwcmlvciB0byB0aGUgcG9wdXAgb3BlbmluZ1xuICAgKi9cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZWxXaXRoRm9jdXMgPSB0aGlzLmVsV2l0aEZvY3VzO1xuXG4gICAgbGV0IGVsZW1lbnRUb0ZvY3VzO1xuICAgIGlmIChlbFdpdGhGb2N1cyAmJiBlbFdpdGhGb2N1cy5mb2N1cyAmJiBib2R5LmNvbnRhaW5zKGVsV2l0aEZvY3VzKSkge1xuICAgICAgZWxlbWVudFRvRm9jdXMgPSBlbFdpdGhGb2N1cztcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudFRvRm9jdXMgPSBib2R5O1xuICAgIH1cbiAgICBlbGVtZW50VG9Gb2N1cy5mb2N1cygpO1xuICAgIHRoaXMuZWxXaXRoRm9jdXMgPSBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZpbGwgY29sb3Igb2YgdGhlICdPSycgYnV0dG9uXG4gICAqL1xuICBnZXRPa0J1dHRvblRleHRDb2xvcigpOiBzdHJpbmcge1xuICAgIC8vIG9ubHkgZm9yIG1hdGVyaWFsIHRoZW1lIHRoZSAnT0snIGhhcyBhIGNvbG9yIGRpZmZlcmVudCB0aGFuIHdoaXRlXG4gICAgaWYgKHRoaXMudGhlbWUgPT09ICdtYXRlcmlhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2xvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZmlsbCBjb2xvciBvZiB0aGUgJ09LJyBidXR0b25cbiAgICovXG4gIGdldE9rQnV0dG9uRmlsbENvbG9yKCk6IHN0cmluZyB7XG4gICAgLy8gbWF0ZXJpYWwgdGhlbWUgZG9lc24ndCBoYXZlIGZpbGxlZCBidXR0b25zXG4gICAgaWYgKHRoaXMudGhlbWUgIT09ICdtYXRlcmlhbCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2xvcjtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYm9yZGVyIGNvbG9yIG9mIHRoZSAnQ2FuY2VsJyBidXR0b25cbiAgICovXG4gIGdldENhbmNlbEJ1dHRvbkJvcmRlckNvbG9yKCk6IHN0cmluZyB7XG4gICAgLy8gbWF0ZXJpYWwgdGhlbWUgZG9lc24ndCBoYXZlIGJvcmRlclxuICAgIGlmICh0aGlzLnRoZW1lICE9PSAnbWF0ZXJpYWwnKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb25maWcuY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHRleHQgY29sb3Igb2YgdGhlICdDYW5jZWwnIGJ1dHRvblxuICAgKi9cbiAgZ2V0Q2FuY2VsQnV0dG9uVGV4dENvbG9yKCk6IHN0cmluZyB7XG4gICAgLy8gZm9yIGRhcmsgdGhlbWUgdGhlIHRleHQgc2hvdWxkIGFsd2F5cyBiZSB3aGl0ZVxuICAgIGlmICh0aGlzLnRoZW1lICE9PSAnZGFyaycpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5jb2xvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==