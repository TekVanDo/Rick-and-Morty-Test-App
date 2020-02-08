import { PaginationController } from '../controllers/pagination-controller';
import { FilterController } from '../controllers/filter-controller';


export interface ControllersDictionary {
  readonly paginationController: PaginationController;
  readonly propertiesFilterController: FilterController;
}

