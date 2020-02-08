import { SelectionController } from '../controllers/SelectionController';
import { PaginationController } from '../controllers/PaginationController';
import { SortingController } from '../controllers/SortingController';
import { PropertiesFilterController } from '../controllers/PropertiesFilterController';

export interface ControllersDictionary {
  readonly selectionController: SelectionController;
  readonly paginationController: PaginationController;
  readonly sortingController: SortingController;
  readonly propertiesFilterController: PropertiesFilterController;
}

