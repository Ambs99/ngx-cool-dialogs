import { NgxCoolDialogsLocalConfig, NgxCoolDialogsCompleteConfig, NgxCoolDialogsGlobalConfig } from './ngx-cool-dialogs.config';
import { NgxCoolDialogTheme } from './ngx-cool-dialogs-theme';
import { NgxCoolDialogType, NgxCoolDialogPromptResult } from './ngx-cool-dialogs-types';
import { OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
export declare class NgxCoolDialog implements OnInit, AfterViewInit, OnDestroy {
    private globalConfig;
    sanitizer: DomSanitizer;
    /**
     * Subject used to stream close events
     */
    private closeSubject;
    /**
     * Observable that emits on every close action
     */
    $close: Observable<boolean | NgxCoolDialogPromptResult>;
    /**
     * The type of the popup
     */
    type: NgxCoolDialogType;
    /**
     * List of all the available dialg types
     */
    types: typeof NgxCoolDialogType;
    /**
     * Main text to render inside the popup
     */
    message: string;
    /**
     * Whether or not the popup is closing
     */
    closing: boolean;
    /**
     * Whether or not to listen to 'enter' key
     */
    canListenToEnter: boolean;
    /**
     * Element that is focused prior to modal opening
     */
    private elWithFocus;
    /**
     * Whether or not to enable host animation
     */
    animation: boolean;
    /**
     * Class to be applied according to the desired theme
     */
    themeClass: string;
    /**
     * Reference to the prompt text input
     */
    promptInput: ElementRef;
    /**
     * Reference to the popup content
     */
    popupContent: ElementRef;
    /**
     * Whether or not to set the host class
     */
    setHostClass: boolean;
    /**
     * The config passed by the user via service methods
     */
    localConfig: NgxCoolDialogsLocalConfig;
    /**
     * Mapped config that blends both local and global configs
     */
    private _config;
    /**
     * The current mapped config
     */
    readonly config: NgxCoolDialogsCompleteConfig;
    /**
     * The current theme
     */
    readonly theme: NgxCoolDialogTheme;
    /**
     * Initializes the component
     * @param globalConfig - the configuration passed via .forRoot()
     */
    constructor(globalConfig: NgxCoolDialogsGlobalConfig, sanitizer: DomSanitizer);
    /**
     * Initializes the component with the theme and mapped configs
     */
    ngOnInit(): void;
    /**
     * Called after Angular initializes the component's views
     */
    ngAfterViewInit(): void;
    /**
     * Listener for the 'esc' key
     */
    escKey(): void;
    /**
     * Listener for the 'enter' key. It needs a fake 'debounce' otherwise
     * the popup would close immediately after it's opened, if it
     * was trigger via an 'enter' key prior to popup opening.
     */
    enterKey(): void;
    /**
     * Closes the current popup. Emits an event with the payload.
     * The payload can either be a boolean, or an object if the type
     * is Prompt.
     * @param result - whether it was 'Cancel': false, or 'OK': true
     */
    close(result?: boolean): void;
    /**
     * Listener for click events on the 'x' button
     */
    onCloseBtnClick(): void;
    /**
     * Function called when the main host animation finishes
     */
    animationDone(): void;
    /**
     * Listener for click events on the 'OK' button
     */
    onOkBtnClick(): void;
    /**
     * Listener for click events on the 'Cancel' button
     */
    onCancelBtnClick(): void;
    /**
     * Listener for click events on the backdrop shadow
     */
    onBackdropClick(): void;
    /**
     * The popup's title
     */
    getTitle(): string;
    /**
     * Component cleanup. return the focus to the element that was active
     * prior to the popup opening
     */
    ngOnDestroy(): void;
    /**
     * Returns the fill color of the 'OK' button
     */
    getOkButtonTextColor(): string;
    /**
     * Returns the fill color of the 'OK' button
     */
    getOkButtonFillColor(): string;
    /**
     * Returns the border color of the 'Cancel' button
     */
    getCancelButtonBorderColor(): string;
    /**
     * Returns the text color of the 'Cancel' button
     */
    getCancelButtonTextColor(): string;
}
