import { FormCpfFactory } from './cpf/form-cpf.factory';
import { FormTextFactory } from './text/form-text.factory';
import { FormTextareaFactory } from './textarea/form-textarea.factory';
import { FormNumberFactory } from './number/form-number.factory';
import { FormDatetimeFactory } from './datetime/form-datetime.factory';
import { FormCnpjFactory } from './cnpj/form-cnpj.factory';
import { FormEmailFactory } from './email/form-email.factory';
import { FormUrlFactory } from './url/form-url.factory';

export class FormFieldService {
  public text(label: string) {
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
}
