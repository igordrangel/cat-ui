import { CatFormConfig } from "@catrx/ui/form";

export interface CatDialogFormConfig {
  formConfig: CatFormConfig<any>;
  isEdit: boolean;
  title?: string;
}
