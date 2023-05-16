import { InputSelectModule } from './components/input-select/input-select.module';
import { NgModule } from '@angular/core';
import { FieldComponent } from './field.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from './components/input-text/input-text.module';
import { TextareaModule } from './components/textarea/textarea.module';
import { InputNumberModule } from './components/input-number/input-number.module';
import { InputDatetimeModule } from './components/input-datetime/input-datetime.module';
import { InputCpfModule } from './components/input-cpf/input-cpf.module';
import {
  IConfig,
  NgxMaskDirective,
  NgxMaskPipe,
  provideNgxMask,
} from 'ngx-mask';
import { InputCnpjModule } from './components/input-cnpj/input-cnpj.module';
import { InputEmailModule } from './components/input-email/input-email.module';
import { InputUrlModule } from './components/input-url/input-url.module';
import { InputCheckboxModule } from './components/input-checkbox/input-checkbox.module';
import { InputRadioModule } from './components/input-radio/input-radio.module';
import { InputFileModule } from './components/input-file/input-file.module';
import { InputAutocompleteModule } from './components/input-autocomplete/input-autocomplete.module';
import { InputPasswordModule } from './components/input-password/input-password.module';
import { InputSearchModule } from './components/input-search/input-search.module';
import { InputCustomFieldModule } from './components/input-custom-field/input-custom-field.module';
import { InputSwitcherModule } from './components/input-switcher/input-switcher.module';
import { InputRangeModule } from './components/input-range/input-range.module';

const maskOptions: Partial<IConfig> | (() => Partial<IConfig>) = {
  validation: false,
};

@NgModule({
  declarations: [FieldComponent],
  exports: [FieldComponent],
  imports: [
    CommonModule,
    InputTextModule,
    InputSearchModule,
    InputPasswordModule,
    InputEmailModule,
    InputUrlModule,
    InputNumberModule,
    InputRangeModule,
    InputDatetimeModule,
    InputCpfModule,
    InputCnpjModule,
    TextareaModule,
    InputSwitcherModule,
    InputCheckboxModule,
    InputRadioModule,
    InputFileModule,
    InputSelectModule,
    InputAutocompleteModule,
    InputCustomFieldModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask(maskOptions)],
})
export class FieldModule {}
