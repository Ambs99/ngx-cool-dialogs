import { Observable } from 'rxjs';
/**
 * Available popup types
 */
export declare enum NgxCoolDialogType {
    Alert = 0,
    Confirm = 1,
    Prompt = 2
}
/**
 * Payload return by the result callback of the prompt popup
 */
export interface NgxCoolDialogPromptResult {
    result: boolean;
    value: string;
}
/**
 * Generic popup result type
 */
export declare type NgxCoolDialogResult = Observable<boolean | NgxCoolDialogPromptResult>;
