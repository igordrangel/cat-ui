import { Component } from '@angular/core';
import { FieldBase } from '../field.base';
import { CatFormTextareaOptions } from '../../../../builder/form.interface';

@Component({
  selector: 'cat-field-textarea[control][fieldConfig]',
  templateUrl: 'textarea.component.html',
  styleUrls: ['textarea.component.css', '../../field.component.css'],
})
export class TextareaComponent extends FieldBase<
  CatFormTextareaOptions,
  HTMLTextAreaElement
> {
  public defaultMinRows = 3;

  public manageQtyRowsOnPressEnter() {
    const textarea = this.elInput?.nativeElement;

    if (textarea) {
      const rows = this.getQtyRows();
      const minRows = this.fieldConfig?.minRows ?? this.defaultMinRows;
      const maxRows = this.fieldConfig?.maxRows ?? 0;

      if (rows <= minRows) {
        textarea.rows = minRows;
      } else if (rows > minRows && rows <= maxRows && rows !== textarea.rows) {
        textarea.rows = rows;
      }
    }
  }

  private getQtyRows() {
    const textarea = this.elInput?.nativeElement;
    if (textarea) {
      const fontsize = 12;
      const charsperrow = textarea.clientWidth / fontsize;
      const hardreturns = textarea.value.split(/\r|\r\n|\n/);

      let rows = hardreturns.length;

      for (let i = 0, len = rows; i < len; i++) {
        const line = hardreturns[i];
        let softreturns = Math.round(line.length / charsperrow);
        //if softreturns is greater than 0, minus by 1 (hard return already counted)
        softreturns = Math.round(softreturns > 0 ? softreturns - 1 : 0);
        rows += softreturns;
      }

      return rows;
    }

    return this.defaultMinRows;
  }
}
