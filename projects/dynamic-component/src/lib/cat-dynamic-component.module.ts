import { NgModule } from '@angular/core';
import { DynamicComponentDirective } from './dynamic-component.directive';
import { DynamicComponentFactory } from './dynamic-component.factory';

@NgModule({
	exports: [
		DynamicComponentFactory
	],
	declarations: [
		DynamicComponentDirective,
		DynamicComponentFactory
	]
})
export class CatDynamicComponentModule {
}
