import {
  CatFormBehaviorAsyncValidator,
  CatFormBehaviorOptions,
  CatFormBehaviorSetValue,
  CatFormBehaviorValidator,
} from '../builder/form.interface';
import { Subject } from 'rxjs';
export class CatFormBehavior {
  private options: CatFormBehaviorOptions = {};

  constructor(public subject: Subject<CatFormBehaviorOptions>) {}

  public enableFields(fields: string[]) {
    this.options.enableFields = fields;
    return this;
  }

  public disableFields(fields: string[]) {
    this.options.disableFields = fields;
    return this;
  }

  public showFields(fields: string[]) {
    this.options.showFields = fields;
    return this;
  }

  public hideFields(fields: string[]) {
    this.options.hideFields = fields;
    return this;
  }

  public replaceValidators(validators: CatFormBehaviorValidator[]) {
    this.options.replaceValidators = validators;
    return this;
  }

  public replaceAsyncValidators(
    asyncValidators: CatFormBehaviorAsyncValidator[]
  ) {
    this.options.replaceAsyncValidators = asyncValidators;
    return this;
  }

  public setValues(values: CatFormBehaviorSetValue[]) {
    this.options.setValues = values;
    return this;
  }

  public send() {
    this.subject.next(this.options);
  }

  public clear() {
    this.options = {};
  }
}
