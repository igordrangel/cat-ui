import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CatFormCustomFieldBase } from '@catrx/ui/form';

@Component({
  templateUrl: './custom-field-example.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CustomFieldExampleComponent extends CatFormCustomFieldBase {}
