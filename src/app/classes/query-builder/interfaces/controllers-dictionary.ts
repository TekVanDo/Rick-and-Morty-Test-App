import { PaginationController } from '../controllers/pagination-controller';
import { FilterController } from '../controllers/filter-controller';


export interface ControllersDictionary {
  readonly pagination: PaginationController;
  readonly filter: FilterController;
}

