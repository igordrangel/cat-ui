import { Injectable } from "@angular/core";
import { clone } from "@koalarx/utils/operators/object";
import { klString } from "@koalarx/utils/operators/string";
import { getValueByTree } from './common/cat-object.helper';
import { CatFormBehaviorSetValue, CatFormConfig, CatFormElementConfig } from "./builder/form.interface";

@Injectable()
export class FormService {
  private autofillValues: CatFormBehaviorSetValue[] = [];

  getAutofillDataTree(
    config: CatFormConfig<any>,
    name?: string
  ) {
    this.generateAutofillDataTree(config, config.autofill, name);
    const autofillValues = this.autofillValues;
    this.autofillValues = [];
    return autofillValues;
  }

  private generateAutofillDataTree(
    config: CatFormConfig<any>,
    data: { [key: string | number]: any },
    name?: string
  ) {
    if (name) {
      const valueDataByTree = getValueByTree(config.autofill, name) as {
        [key: string | number]: any;
      };

      if (Array.isArray(valueDataByTree)) {
        const isObjectArray = !!valueDataByTree.find(
          (item) => typeof item === 'object'
        );
        const isListItem = this.isListItemByName(
          name,
          config.formElements
        );

        if (isObjectArray && isListItem) {
          valueDataByTree.forEach((item, indexItem) => {
            clone(Object.keys(item)).forEach((propItem) => {
              const prefix = name.substring(0, name.length - 3);
              let suffix = name.substring(name.length - 3);
              if (suffix === `[${indexItem > 0 ? indexItem - 1 : indexItem}]`) {
                suffix = suffix.replace(`[${indexItem - 1}]`, `[${indexItem}]`);
              } else {
                suffix += `[${indexItem}]`;
              }

              name = this.generateAutofillDataTree(
                config,
                item[propItem],
                `${prefix}${suffix}.${propItem}`
              );
            });
          });
        } else {
          this.autofillValues.push({
            name,
            value: valueDataByTree,
          });
        }
      } else if (
        valueDataByTree &&
        typeof valueDataByTree === 'object' &&
        !this.isFileByName(name, config.formElements)
      ) {
        clone(Object.keys(valueDataByTree)).forEach((index) => {
          name = this.generateAutofillDataTree(
            config,
            valueDataByTree[index],
            `${name}.${index}`
          );
        });
      } else {
        this.autofillValues.push({
          name,
          value: valueDataByTree,
        });
        name = klString(name)
          .split('.')
          .pipe((KlName) => {
            const arrName = KlName.getValue();
            arrName.splice(arrName.length - 1, 1);
            return arrName;
          })
          .toString('.')
          .getValue();
      }
    } else {
      clone(Object.keys(data)).map((index) => {
        if (data[index] && Array.isArray(data[index])) {
          const isObjectArray = !!data[index].find(
            (item) => typeof item === 'object'
          );
          const isListItem = this.isListItemByName(
            index,
            config.formElements
          );
          if (isObjectArray && isListItem) {
            data[index].forEach((item, indexItem) => {
              clone(Object.keys(item)).forEach((propItem) => {
                name = this.generateAutofillDataTree(
                  config,
                  item,
                  `${index}[${indexItem}].${propItem}`
                );
              });
            });
          } else {
            this.autofillValues.push({
              name: index,
              value: data[index],
            });
          }
        } else if (data[index] && typeof data[index] === 'object') {
          clone(Object.keys(data[index])).forEach((objIndex) => {
            name = this.generateAutofillDataTree(
              config,
              data[index],
              `${index}.${objIndex}`
            );
          });
        } else {
          this.autofillValues.push({
            name: index,
            value: data[index],
          });
        }
      });
    }

    return name;
  }

  private isListItemByName(
    name: string,
    formElement: CatFormElementConfig[]
  ): boolean {
    return !!formElement.find((formElement) => {
      if (formElement.listItem) {
        const splitedName = name.split('.');
        if (
          splitedName[splitedName.length - 1] === formElement.listItem.name ||
          this.isListItemByName(name, formElement.listItem.config.formElements)
        ) {
          return true;
        }
      }
      return false;
    });
  }

  private isFileByName(
    name: string,
    formElement: CatFormElementConfig[]
  ): boolean {
    return !!formElement.find((formElement) => {
      if (formElement.field) {
        const splitedName = name.split('.');
        if (
          splitedName[splitedName.length - 1] === formElement.field.name &&
          formElement.field.type === 'file'
        ) {
          return true;
        }
      }

      if (formElement.fieldset) {
        if (this.isFileByName(name, formElement.fieldset.config.formElements)) {
          return true;
        }
      }

      if (formElement.listItem) {
        if (this.isFileByName(name, formElement.listItem.config.formElements)) {
          return true;
        }
      }

      return false;
    });
  }
}
