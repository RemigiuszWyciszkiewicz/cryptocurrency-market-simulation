import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService as NgxToastrService } from 'ngx-toastr';

export type ToastrType = 'success' | 'info' | 'warning' | 'error';

const DEFAULT_TOASTR_WINDOW_CONFIGURATION = {
  progressBar: true,
  positionClass: 'toast-bottom-right',
};

export const DEFAULT_TOASTR_CONFIGURATION = {
  success: DEFAULT_TOASTR_WINDOW_CONFIGURATION,
  info: DEFAULT_TOASTR_WINDOW_CONFIGURATION,
  warning: DEFAULT_TOASTR_WINDOW_CONFIGURATION,
  error: DEFAULT_TOASTR_WINDOW_CONFIGURATION,
};

export interface CustomToastrServiceConfiguration {
  success: Partial<IndividualConfig>;
  info: Partial<IndividualConfig>;
  warning: Partial<IndividualConfig>;
  error: Partial<IndividualConfig>;
}

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  constructor(private readonly _ngxToastrService: NgxToastrService) {}

  success(message: string, title?: string, config?: Partial<IndividualConfig>): void {
    this._ngxToastrService.success(message, title, config || this.getConfiguration('success'));
  }

  info(message: string, title?: string, config?: Partial<IndividualConfig>): void {
    this._ngxToastrService.info(message, title, this.getConfiguration('info'));
  }

  warning(message: string, title?: string, config?: Partial<IndividualConfig>): void {
    this._ngxToastrService.warning(message, title, this.getConfiguration('warning'));
  }

  error(message: string, title?: string, config?: Partial<IndividualConfig>): void {
    this._ngxToastrService.error(message, title, this.getConfiguration('error'));
  }

  private getConfiguration(toastrType: ToastrType): Partial<IndividualConfig> | null {
    return { newestOnTop: true };
  }
}
