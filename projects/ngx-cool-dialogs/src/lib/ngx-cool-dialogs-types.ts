import { Observable } from 'rxjs';

/**
 * Available popup types
 */
export enum NgxCoolDialogType {
  Alert,
  Confirm,
  Prompt,
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
export type NgxCoolDialogResult = Observable<boolean | NgxCoolDialogPromptResult>;
