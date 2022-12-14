import { NgModule } from '@angular/core';
import { FieldComponent } from './field.component';
import { CommonModule } from '@angular/common';
import { InputTextModule } from './components/input-text/input-text.module';
import { TextareaModule } from './components/textarea/textarea.module';
import { InputNumberModule } from './components/input-number/input-number.module';
import { InputDatetimeModule } from './components/input-datetime/input-datetime.module';
import { InputCpfModule } from './components/input-cpf/input-cpf.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { InputCnpjModule } from './components/input-cnpj/input-cnpj.module';
import { InputEmailModule } from './components/input-email/input-email.module';
import { InputUrlModule } from './components/input-url/input-url.module';
import { InputCheckboxModule } from './components/input-checkbox/input-checkbox.module';
import { InputRadioModule } from './components/input-radio/input-radio.module';

const maskOptions: Partial<IConfig> | (() => Partial<IConfig>) = {
  validation: false
};

@NgModule({
  declarations: [FieldComponent],
  exports: [FieldComponent],
  imports: [
    CommonModule,
    InputTextModule,
    InputEmailModule,
    InputUrlModule,
    InputNumberModule,
    InputDatetimeModule,
    InputCpfModule,
    InputCnpjModule,
    TextareaModule,
    InputCheckboxModule,
    InputRadioModule,
    NgxMaskModule.forRoot(maskOptions)
  ]
})
export class FieldModule {}
