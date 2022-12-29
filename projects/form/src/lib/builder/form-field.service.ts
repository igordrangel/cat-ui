import { FormCpfFactory } from './cpf/form-cpf.factory';
import { FormTextFactory } from './text/form-text.factory';
import { FormTextareaFactory } from './textarea/form-textarea.factory';
import { FormNumberFactory } from './number/form-number.factory';
import { FormDatetimeFactory } from './datetime/form-datetime.factory';
import { FormCnpjFactory } from './cnpj/form-cnpj.factory';
import { FormEmailFactory } from './email/form-email.factory';
import { FormUrlFactory } from './url/form-url.factory';
import { FormCheckboxFactory } from './checkbox/form-checkbox.factory';
import { FormRadioFactory } from './radio/form-radio.factory';
import { FormFileFactory } from './file/form-file.factory';
import { FormCsvFactory } from './csv/form-csv.factory';
import { FormSelectFactory } from './select/form-select.factory';
import { FormAutocompleteFactory } from './autocomplete/form-autocomplete.factory';

export class FormFieldService {
  public text(label: string) {
    return new FormTextFactory(label);
  }

  public password(label: string) {
    return new FormTextFactory(label);
  }

  public email(label: string) {
    return new FormEmailFactory(label);
  }

  public url(label: string) {
    return new FormUrlFactory(label);
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

  public cpf(label: string) {
    return new FormCpfFactory(label);
  }

  public cnpj(label: string) {
    return new FormCnpjFactory(label);
  }

  public checkbox(label: string) {
    return new FormCheckboxFactory(label);
  }

  public radio(label: string) {
    return new FormRadioFactory(label);
  }

  public file(label: string) {
    return new FormFileFactory(label);
  }

  public csv(label: string) {
    return new FormCsvFactory(label);
  }

  public select(label: string) {
    return new FormSelectFactory(label);
  }

  public autocomplete(label: string) {
    return new FormAutocompleteFactory(label);
  }
}
