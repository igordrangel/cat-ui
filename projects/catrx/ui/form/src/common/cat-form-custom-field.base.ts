import { CatFormCustomFieldOptions } from '../builder/form.interface';

export abstract class CatFormCustomFieldBase<PropsType = any> {
  private data: CatFormCustomFieldOptions<PropsType>;

  getConfig() {
    return this.data;
  }
}
