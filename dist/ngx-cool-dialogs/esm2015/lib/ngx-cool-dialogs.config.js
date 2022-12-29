import { InjectionToken } from '@angular/core';
/**
 * Base configuration object. It applies to both local and global
 * settings. Local refers to config passed through the service's
 * methods; Global referes to config passed through the module's
 * .forRoot()
 */
export class NgxCoolDialogsBaseConfig {
    constructor() {
        this.theme = 'default';
        this.color = '#3F51B5';
    }
}
/**
 * Configuration injection token
 */
export let NGX_COOL_DIALOGS_CONFIG = new InjectionToken('ngx-cool-dialogs.config');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWNvb2wtZGlhbG9ncy5jb25maWcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtY29vbC1kaWFsb2dzLyIsInNvdXJjZXMiOlsibGliL25neC1jb29sLWRpYWxvZ3MuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHL0M7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8sd0JBQXdCO0lBcUJuQztRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0lBQ3pCLENBQUM7Q0FDRjtBQXVDRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUNyRCx5QkFBeUIsQ0FDMUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hDb29sRGlhbG9nVGhlbWUgfSBmcm9tICcuL25neC1jb29sLWRpYWxvZ3MtdGhlbWUnO1xuXG4vKipcbiAqIEJhc2UgY29uZmlndXJhdGlvbiBvYmplY3QuIEl0IGFwcGxpZXMgdG8gYm90aCBsb2NhbCBhbmQgZ2xvYmFsXG4gKiBzZXR0aW5ncy4gTG9jYWwgcmVmZXJzIHRvIGNvbmZpZyBwYXNzZWQgdGhyb3VnaCB0aGUgc2VydmljZSdzXG4gKiBtZXRob2RzOyBHbG9iYWwgcmVmZXJlcyB0byBjb25maWcgcGFzc2VkIHRocm91Z2ggdGhlIG1vZHVsZSdzXG4gKiAuZm9yUm9vdCgpXG4gKi9cbmV4cG9ydCBjbGFzcyBOZ3hDb29sRGlhbG9nc0Jhc2VDb25maWcge1xuICAvKipcbiAgICogUG9wdXAgdGhlbWVcbiAgICovXG4gIHRoZW1lPzogTmd4Q29vbERpYWxvZ1RoZW1lO1xuXG4gIC8qKlxuICAgKiBUZXh0IG9mIHRoZSAnT0snIGJ1dHRvblxuICAgKi9cbiAgb2tCdXR0b25UZXh0Pzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUZXh0IG9mIHRoZSAnQ2FuY2VsJyBidXR0b25cbiAgICovXG4gIGNhbmNlbEJ1dHRvblRleHQ/OiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIENvbG9yIGZvciBidXR0b25zIChmaWxsLCBsYWJlbHMgYW5kIGJvcmRlcnMpXG4gICAqL1xuICBjb2xvcj86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRoZW1lID0gJ2RlZmF1bHQnO1xuICAgIHRoaXMuY29sb3IgPSAnIzNGNTFCNSc7XG4gIH1cbn1cblxuLyoqXG4gKiBPYmplY3QgdXNlZCB0byBzZXQgdGhlIHRpdGxlcyBvZiBhbGwgcG9wdXBzIHVwZnJvbnRcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZ3hDb29sRGlhbG9nc0dsb2JhbFRpdGxlcyB7XG4gIHRpdGxlcz86IHtcbiAgICBhbGVydD86IHN0cmluZztcbiAgICBjb25maXJtPzogc3RyaW5nO1xuICAgIHByb21wdD86IHN0cmluZztcbiAgfTtcbn1cblxuLyoqXG4gKiBNb2RlbHMgdGhlIHByb3BzIHlvdSBjYW4gY2hhbmdlIG9ubHkgdmlhIHNlcnZpY2UncyBtZXRob2RzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgTmd4Q29vbERpYWxvZ3NMb2NhbENvbmZpZ0NvbXBsZW1lbnQge1xuICB0aXRsZT86IHN0cmluZztcbiAgZGVmYXVsdFRleHQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgYWxsb3dhYmxlIGludGVyZmFjZSBmb3IgZ2xvYmFsIGNvbmZpZyBvbmx5XG4gKi9cbmV4cG9ydCB0eXBlIE5neENvb2xEaWFsb2dzR2xvYmFsQ29uZmlnID0gTmd4Q29vbERpYWxvZ3NCYXNlQ29uZmlnICYgTmd4Q29vbERpYWxvZ3NHbG9iYWxUaXRsZXM7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgYWxsb3dhYmxlIGludGVyZmFjZSBmb3IgbG9jYWwgY29uZmlnIG9ubHlcbiAqL1xuZXhwb3J0IHR5cGUgTmd4Q29vbERpYWxvZ3NMb2NhbENvbmZpZyA9IE5neENvb2xEaWFsb2dzQmFzZUNvbmZpZyAmXG4gIE5neENvb2xEaWFsb2dzTG9jYWxDb25maWdDb21wbGVtZW50O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSB1bmlvbiBiZXR3ZWVuIGdsb2JhbCBhbmQgbG9jYWwgY29uZmlnc1xuICovXG5leHBvcnQgdHlwZSBOZ3hDb29sRGlhbG9nc0NvbXBsZXRlQ29uZmlnID0gTmd4Q29vbERpYWxvZ3NCYXNlQ29uZmlnICZcbiAgTmd4Q29vbERpYWxvZ3NHbG9iYWxUaXRsZXMgJlxuICBOZ3hDb29sRGlhbG9nc0xvY2FsQ29uZmlnQ29tcGxlbWVudDtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGluamVjdGlvbiB0b2tlblxuICovXG5leHBvcnQgbGV0IE5HWF9DT09MX0RJQUxPR1NfQ09ORklHID0gbmV3IEluamVjdGlvblRva2VuPE5neENvb2xEaWFsb2dzR2xvYmFsQ29uZmlnPihcbiAgJ25neC1jb29sLWRpYWxvZ3MuY29uZmlnJ1xuKTtcbiJdfQ==