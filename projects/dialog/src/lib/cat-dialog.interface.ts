export interface CatDialogOptions {
  size?: CatDialogSize;
  data?: any;
  closeTrigger?: any;
  callbackCloseTrigger?: (value: any) => void;
}

export type CatDialogSize = 'auto' | 'small' | 'medium' | 'big';
