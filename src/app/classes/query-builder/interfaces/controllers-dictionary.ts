import { PaginationController } from '../controllers/PaginationController';
import { PropertiesFilterController } from '../controllers/PropertiesFilterController';

export interface ControllersDictionary {
  readonly paginationController: PaginationController;
  readonly propertiesFilterController: PropertiesFilterController;
}

