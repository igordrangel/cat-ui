import { FormTextFactory } from './text/form-text.factory';
import { FormTextareaFactory } from './textarea/form-textarea.factory';
import { FormNumberFactory } from './number/form-number.factory';
import { FormDatetimeFactory } from './datetime/form-datetime.factory';

export class FormFieldService {
  public text(label: string) {
    return new FormTextFactory(label);
  }

  public number(label: string) {
    return new FormNumberFactory(label);
  }

  public date(label: string) {
    return new FormDatetimeFactory(label);
  }

  public textarea(label: string) {
    return new FormTextareaFactory(label);
  }
}
