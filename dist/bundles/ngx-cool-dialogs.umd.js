(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/animations'), require('rxjs'), require('@angular/platform-browser'), require('@angular/cdk/portal')) :
    typeof define === 'function' && define.amd ? define('ngx-cool-dialogs', ['exports', '@angular/core', '@angular/common', '@angular/animations', 'rxjs', '@angular/platform-browser', '@angular/cdk/portal'], factory) :
    (global = global || self, factory(global['ngx-cool-dialogs'] = {}, global.ng.core, global.ng.common, global.ng.animations, global.rxjs, global.ng.platformBrowser, global.ng.cdk.portal));
}(this, (function (exports, core, common, animations, rxjs, platformBrowser, portal) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __createBinding(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    /**
     * Base configuration object. It applies to both local and global
     * settings. Local refers to config passed through the service's
     * methods; Global referes to config passed through the module's
     * .forRoot()
     */
    var NgxCoolDialogsBaseConfig = /** @class */ (function () {
        function NgxCoolDialogsBaseConfig() {
            this.theme = 'default';
            this.color = '#3F51B5';
        }
        return NgxCoolDialogsBaseConfig;
    }());
    /**
     * Configuration injection token
     */
    var NGX_COOL_DIALOGS_CONFIG = new core.InjectionToken('ngx-cool-dialogs.config');

    var fadeInOut = animations.trigger('fadeInOut', [
        animations.state('in', animations.style({ opacity: '1' })),
        animations.transition('void => *', [
            animations.style({ opacity: 0 }),
            animations.animate('.3s ease')
        ]),
        animations.transition('* => void', [
            animations.animate('0.3s 150ms ease', animations.style({ opacity: 0 }))
        ])
    ]);

    /**
     * Available popup types
     */

    (function (NgxCoolDialogType) {
        NgxCoolDialogType[NgxCoolDialogType["Alert"] = 0] = "Alert";
        NgxCoolDialogType[NgxCoolDialogType["Confirm"] = 1] = "Confirm";
        NgxCoolDialogType[NgxCoolDialogType["Prompt"] = 2] = "Prompt";
    })(exports.NgxCoolDialogType || (exports.NgxCoolDialogType = {}));

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
            this.closeSubject = new rxjs.Subject();
            /**
             * Observable that emits on every close action
             */
            this.$close = this.closeSubject.asObservable();
            /**
             * List of all the available dialg types
             */
            this.types = exports.NgxCoolDialogType;
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
            if (this.type === exports.NgxCoolDialogType.Prompt) {
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
                if (_this.type === exports.NgxCoolDialogType.Prompt) {
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
            if (this.type === exports.NgxCoolDialogType.Alert) {
                title = titles.alert;
            }
            else if (this.type === exports.NgxCoolDialogType.Confirm) {
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
            { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [NGX_COOL_DIALOGS_CONFIG,] }] },
            { type: platformBrowser.DomSanitizer }
        ]; };
        __decorate([
            core.HostBinding('@fadeInOut')
        ], NgxCoolDialog.prototype, "animation", void 0);
        __decorate([
            core.HostBinding('class')
        ], NgxCoolDialog.prototype, "themeClass", void 0);
        __decorate([
            core.ViewChild('promptInput', { static: false })
        ], NgxCoolDialog.prototype, "promptInput", void 0);
        __decorate([
            core.ViewChild('popupContent', { static: false })
        ], NgxCoolDialog.prototype, "popupContent", void 0);
        __decorate([
            core.HostBinding('class.ngx-cool-dialog')
        ], NgxCoolDialog.prototype, "setHostClass", void 0);
        NgxCoolDialog = __decorate([
            core.Component({
                selector: 'ngx-cool-dialog',
                template: "<div\n  class=\"ngx-cool-dialog__backdrop\"\n  (click)=\"onBackdropClick()\"\n  [@fadeInOut]\n></div>\n<div\n  class=\"ngx-cool-dialog__content\"\n  #popupContent\n  tabindex=\"-1\"\n  (keyup.esc)=\"escKey()\"\n  (keyup.enter)=\"enterKey()\"\n  [class.ngx-cool-dialog__content--closing]=\"closing\"\n>\n  <div class=\"ngx-cool-dialog__header\">\n    <h3 class=\"ngx-cool-dialog__title\">\n      <ng-container *ngIf=\"getTitle(); else anotherTitle\">\n        {{ getTitle() }}\n      </ng-container>\n      <ng-template #anotherTitle>\n        <ng-container\n          *ngIf=\"type === types.Alert\"\n          i18n=\"The default title for Alert dialogs@@ngxCoolDialogAlert\"\n        >\n          Alert\n        </ng-container>\n        <ng-container\n          *ngIf=\"type === types.Confirm\"\n          i18n=\"The default title for Confirm dialogs@@ngxCoolDialogConfirm\"\n        >\n          Confirm\n        </ng-container>\n        <ng-container\n          *ngIf=\"type === types.Prompt\"\n          i18n=\"The default title for Prompt dialogs@@ngxCoolDialogPrompt\"\n        >\n          Prompt\n        </ng-container>\n      </ng-template>\n    </h3>\n    <button\n      class=\"ngx-cool-dialog__close-btn\"\n      *ngIf=\"theme !== 'material'\"\n      (click)=\"onCloseBtnClick()\"\n    >\n      <span class=\"ngx-cool-dialog__close-symbol\"></span>\n    </button>\n  </div>\n  <hr class=\"ngx-cool-dialog__divider\" />\n  <p\n    class=\"ngx-cool-dialog__text\"\n    [innerHtml]=\"sanitizer.bypassSecurityTrustHtml(message)\"\n  ></p>\n  <input\n    *ngIf=\"type === types.Prompt\"\n    type=\"text\"\n    #promptInput\n    autofocus\n    class=\"ngx-cool-dialog__input\"\n  />\n  <div class=\"ngx-cool-dialog__footer\">\n    <button\n      *ngIf=\"type === types.Confirm || type === types.Prompt\"\n      class=\"ngx-cool-dialog__cancel-btn\"\n      [style.color]=\"getCancelButtonTextColor()\"\n      [style.border-color]=\"getCancelButtonBorderColor()\"\n      (click)=\"onCancelBtnClick()\"\n    >\n      <ng-container\n        *ngIf=\"!config.cancelButtonText; else customCancelLabel\"\n        i18n=\"The default text in the Cancel btn@@ngxCoolDialogCancelButton\"\n      >\n        Cancel\n      </ng-container>\n      <ng-template #customCancelLabel>\n        {{ config.cancelButtonText }}\n      </ng-template>\n    </button>\n    <button\n      class=\"ngx-cool-dialog__ok-btn\"\n      [style.color]=\"getOkButtonTextColor()\"\n      [style.background-color]=\"getOkButtonFillColor()\"\n      (click)=\"onOkBtnClick()\"\n    >\n      <ng-container\n        *ngIf=\"!config.okButtonText; else customOkLabel\"\n        i18n=\"The default text in the OK btn@@ngxCoolDialogOKButton\"\n      >\n        OK\n      </ng-container>\n      <ng-template #customOkLabel> {{ config.okButtonText }} </ng-template>\n    </button>\n  </div>\n</div>\n",
                animations: [fadeInOut],
                host: {
                    '(@fadeInOut.done)': 'animationDone()',
                },
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".ngx-cool-dialog{position:fixed;z-index:9999;top:0;width:100%;left:0;height:100%;text-align:center;align-items:center;display:flex;justify-content:center;padding:0 20px}.ngx-cool-dialog__backdrop{position:absolute;z-index:10;top:0;bottom:0;left:0;right:0;background:rgba(5,6,19,.64)}.ngx-cool-dialog__backdrop--hidden{background:0 0}.ngx-cool-dialog__content{width:425px;background:#fff;box-shadow:0 3px 13px rgba(0,0,0,.5);border-radius:2px;overflow:hidden;z-index:20;position:relative;padding:19px 21px;animation-name:ngx-cool-dialog-fade-in-up;animation-fill-mode:forwards;animation-duration:.5s;animation-timing-function:cubic-bezier(.785,.135,.15,.86);box-sizing:border-box}.ngx-cool-dialog__content--closing{animation-name:ngx-cool-dialog-fade-out-down;animation-timing-function:ease-out}.ngx-cool-dialog__input{display:block;width:100%;margin-bottom:20px;height:38px;border-radius:2px;border:1px solid #d6d6d6;font-size:1em;padding:0 10px;box-sizing:border-box}.ngx-cool-dialog__header{display:flex;justify-content:space-between;margin-bottom:18px;align-items:center}.ngx-cool-dialog__title{margin:0;font-size:1.14em;font-weight:600}.ngx-cool-dialog__divider{border-top:1px solid #ededed;border-bottom:none;margin-bottom:14px;border-right:none;border-left:none}.ngx-cool-dialog__text{margin-top:0;text-align:left;line-height:1.6em;margin-bottom:16px}.ngx-cool-dialog__footer{display:flex;justify-content:flex-end}.ngx-cool-dialog__cancel-btn,.ngx-cool-dialog__ok-btn{height:36px;padding:0 24px;border-radius:2px;font-weight:600;font-size:1em}.ngx-cool-dialog__cancel-btn{border:1px solid #3f51b5;color:#3f51b5;background:0 0;margin-right:16px}.ngx-cool-dialog__cancel-btn:hover{background:#fafafa}.ngx-cool-dialog__ok-btn{border:none;background:#3f51b5;color:#fff;min-width:100px}.ngx-cool-dialog__ok-btn:hover{opacity:.93}.ngx-cool-dialog__close-btn{border:none;background:0 0;padding:0;cursor:pointer}.ngx-cool-dialog__close-symbol{height:12px;width:12px;position:relative;display:block}.ngx-cool-dialog__close-symbol:after,.ngx-cool-dialog__close-symbol:before{content:\"\";height:2px;width:100%;border-radius:2px;background:#d9d9d9;position:absolute;top:calc(50% - 1px);left:0}.ngx-cool-dialog__close-symbol:after{transform:rotate(45deg)}.ngx-cool-dialog__close-symbol:before{transform:rotate(-45deg)}.ngx-cool-dialog__close-symbol:hover:after,.ngx-cool-dialog__close-symbol:hover:before{background:#bdbdbd}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__divider{border-top-color:#424346}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__content{background:#323337}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__title{color:#fff;font-weight:700}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__text{color:#fff;font-weight:600}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn{background:0 0;color:#fff;border-width:2px}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn:hover{background:rgba(255,255,255,.03)}.ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog--dark-theme .ngx-cool-dialog__input{background:0 0;color:#fff}@keyframes ngx-cool-dialog-fade-in-up{from{opacity:0;transform:translateY(11px)}to{opacity:1;transform:translateY(0)}}@keyframes ngx-cool-dialog-fade-out-down{from{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(17px)}}.ngx-cool-dialog--material-theme .ngx-cool-dialog__divider{display:none}.ngx-cool-dialog--material-theme .ngx-cool-dialog__title{font-size:1.42em;font-weight:700}.ngx-cool-dialog--material-theme .ngx-cool-dialog__content{padding-bottom:15px}.ngx-cool-dialog--material-theme .ngx-cool-dialog__header{margin-bottom:12px}.ngx-cool-dialog--material-theme .ngx-cool-dialog__ok-btn{min-width:inherit;background:0 0;color:#3f51b5;margin-left:0}.ngx-cool-dialog--material-theme .ngx-cool-dialog__ok-btn:hover{background:#fafafa}.ngx-cool-dialog--material-theme .ngx-cool-dialog__cancel-btn{border:none}.ngx-cool-dialog--material-theme .ngx-cool-dialog__cancel-btn,.ngx-cool-dialog--material-theme .ngx-cool-dialog__ok-btn{padding:0 16px;font-weight:700;text-transform:uppercase}.ngx-cool-dialog--material-theme .ngx-cool-dialog__text{font-size:1.14em;margin-bottom:12px}.ngx-cool-dialog--material-theme .ngx-cool-dialog__input{border-radius:0;border:none;border-bottom:1px solid #979797;padding-left:0;font-size:1.14em}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__divider{border-top-color:#424346}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__content{background:#323337}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__title{color:#fff;font-weight:700}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__text{color:#fff;font-weight:600}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn{background:0 0;color:#fff;border-width:2px}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn:hover{background:rgba(255,255,255,.03)}.ngx-cool-dialog--dark-theme .ngx-cool-dialog__input{background:0 0;color:#fff}@media screen and (min-device-width:320px) and (max-device-width:480px){.ngx-cool-dialog--dark-theme .ngx-cool-dialog__cancel-btn,.ngx-cool-dialog--dark-theme .ngx-cool-dialog__ok-btn,.ngx-cool-dialog--default-theme .ngx-cool-dialog__cancel-btn,.ngx-cool-dialog--default-theme .ngx-cool-dialog__ok-btn{flex:1;padding:10px;height:inherit}}"]
            }),
            __param(0, core.Optional()),
            __param(0, core.Inject(NGX_COOL_DIALOGS_CONFIG))
        ], NgxCoolDialog);
        return NgxCoolDialog;
    }());

    var NgxCoolDialogsService = /** @class */ (function () {
        function NgxCoolDialogsService(appRef, componentFactoryResolver, injector) {
            this.appRef = appRef;
            this.componentFactoryResolver = componentFactoryResolver;
            this.injector = injector;
            // Create a Portal based on the NgxCoolDialog component
            this.coolDialogPortal = new portal.ComponentPortal(NgxCoolDialog);
            // Create a PortalHost anchored in document.body
            this.bodyPortalHost = new portal.DomPortalOutlet(document.body, this.componentFactoryResolver, this.appRef, this.injector);
        }
        /**
         * Creates an alert popup
         * @param message - text to render inside the popup
         * @param config - optional configuration object
         */
        NgxCoolDialogsService.prototype.alert = function (message, config) {
            return this.createCoolDialogComponent(exports.NgxCoolDialogType.Alert, message, config);
        };
        /**
         * Creates a confirm popup
         * @param message - text to render inside the popup
         * @param config - optional configuration object
         */
        NgxCoolDialogsService.prototype.confirm = function (message, config) {
            return this.createCoolDialogComponent(exports.NgxCoolDialogType.Confirm, message, config);
        };
        /**
         * Creates a prompt popup
         * @param message - text to render inside the popup
         * @param config - optional configuration object
         */
        NgxCoolDialogsService.prototype.prompt = function (prompt, config) {
            return this.createCoolDialogComponent(exports.NgxCoolDialogType.Prompt, prompt, config);
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
            return new rxjs.Observable(function (observer) {
                // subscribe to the popup closing event to forward the event to the caller
                var _subscription = coolDialog.$close.subscribe(function (res) {
                    _subscription.unsubscribe();
                    observer.next(res);
                });
            });
        };
        NgxCoolDialogsService.ctorParameters = function () { return [
            { type: core.ApplicationRef },
            { type: core.ComponentFactoryResolver },
            { type: core.Injector }
        ]; };
        NgxCoolDialogsService = __decorate([
            core.Injectable()
        ], NgxCoolDialogsService);
        return NgxCoolDialogsService;
    }());

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
            core.NgModule({
                imports: [common.CommonModule],
                declarations: [NgxCoolDialog],
                exports: [NgxCoolDialog],
                entryComponents: [NgxCoolDialog],
            })
        ], NgxCoolDialogsModule);
        return NgxCoolDialogsModule;
    }());

    exports.NGX_COOL_DIALOGS_CONFIG = NGX_COOL_DIALOGS_CONFIG;
    exports.NgxCoolDialog = NgxCoolDialog;
    exports.NgxCoolDialogsBaseConfig = NgxCoolDialogsBaseConfig;
    exports.NgxCoolDialogsModule = NgxCoolDialogsModule;
    exports.NgxCoolDialogsService = NgxCoolDialogsService;
    exports.ɵa = fadeInOut;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-cool-dialogs.umd.js.map
