import { CommonController } from './CommonController';
import { IPropertiesFilter } from '../interfaces/query-filter.interfaces';

export interface PropertiesItemUrlParams {
  field: string;
  value: string | string[];
}

export interface PropertiesUrlParams {
  filter: PropertiesItemUrlParams[];
}

export class PropertiesFilterController extends CommonController<IPropertiesFilter, PropertiesUrlParams> {
  setFilter(filterName, value) {
    const filters = this.getValue();
    if (!value && filters[value]) {
      delete filters[value];
    } else {
      filters[filterName] = value;
    }
    this.setValue(filters);
  }

  setValue(params: any): void {
    const paramsWithoutEmptyValues = params;

    Object.keys(paramsWithoutEmptyValues).forEach((key) => {
      if (!paramsWithoutEmptyValues[key]) {
        delete paramsWithoutEmptyValues[key];
      }
      if (Array.isArray(paramsWithoutEmptyValues[key]) && paramsWithoutEmptyValues[key].length === 0) {
        delete paramsWithoutEmptyValues[key];
      }
    });
    super.setValue(paramsWithoutEmptyValues);
  }

  setDefaultValue(defaultValue: any) {
    if (typeof defaultValue !== 'object') {
      throw new Error('defaultValue should be an object');
    }

    this.defaultValue = defaultValue;
  }

  getDefaultValue(): IPropertiesFilter {
    return this.defaultValue || super.getDefaultValue();
  }

  clearProperty(propertyName: string) {
    const model = this.getValue();
    const defaultPropertyValue = (this.getDefaultValue() || {})[propertyName];
    if (model[propertyName] && model[propertyName] !== defaultPropertyValue) {
      delete model[propertyName];
      this.setValue(model);
    }
  }
}
