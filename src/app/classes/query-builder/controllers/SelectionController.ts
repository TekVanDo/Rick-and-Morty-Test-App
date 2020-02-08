import { CommonController } from './CommonController';
import { ISelection } from '../interfaces/query-filter.interfaces';

export class SelectionController extends CommonController<ISelection> {
  totalCount = 0;

  setTotalCount(totalCount: number) {
    this.totalCount = totalCount;
  }

  getDefaultValue(): ISelection {
    return {
      include: [],
      exclude: [],
      all: false
    };
  }

  clear(): void {
    super.clear();
    this.setTotalCount(0);
  }

  getSelectedCount(): number {
    const params = this.getValue();
    if (params.all) {
      return this.totalCount - params.exclude.length;
    } else {
      return params.include.length;
    }
  }

  selectItem(item): void {
    const params = this.getValue();
    const indexOfExclude = params.exclude.indexOf(item);
    const indexOfInclude = params.include.indexOf(item);

    if (!params.all && indexOfInclude === -1) {
      params.include.push(item);
    }
    if (indexOfExclude !== -1) {
      params.exclude.splice(indexOfExclude, 1);
    }
    this.onChange.next({ ...params });
    this.allFlagSynchronize();
  }

  unSelectItem(item): void {
    const params = this.getValue();
    const indexOfExclude = params.exclude.indexOf(item);
    const indexOfInclude = params.include.indexOf(item);
    if (indexOfExclude === -1) {
      params.exclude.push(item);
    }
    if (!params.all && indexOfInclude !== -1) {
      params.include.splice(indexOfInclude, 1);
    }

    this.onChange.next({ ...params });
    this.allFlagSynchronize();
  }

  selectAll(): void {
    const params = this.getValue();
    params.include.length = 0;
    params.exclude.length = 0;
    params.all = true;

    this.onChange.next({ ...params });
  }

  unSelectAll(): void {
    if (!this.isSomeSelected()) {
      return;
    }
    const params = this.getValue();
    params.include.length = 0;
    params.exclude.length = 0;
    params.all = false;

    this.onChange.next({ ...params });
  }

  toggleAllSelection(): void {
    if (this.getValue()) {
      this.unSelectAll();
    } else {
      this.selectAll();
    }
  }

  toggleItemSelection(item: any): void {
    if (this.isItemSelected(item)) {
      this.unSelectItem(item);
    } else {
      this.selectItem(item);
    }
  }

  isItemSelected(item): boolean {
    const params = this.getValue();
    if (params.all) {
      return params.exclude.indexOf(item) === -1;
    } else {
      return params.include.indexOf(item) !== -1;
    }
  }

  isSomeSelected(): boolean {
    const params = this.getValue();
    return !!(params.all || params.include.length);
  }

  isSomeSelectedButNotAll(): boolean {
    return this.isSomeSelected() && !this.isAllSelected();
  }

  isAllSelected(): boolean {
    const params = this.getValue();
    return params.all && !params.exclude.length;
  }

  private allFlagSynchronize() {
    if (!this.totalCount) {
      return;
    }
    const params = this.getValue();
    if (params.all && params.exclude.length === this.totalCount) {
      this.unSelectAll();
    }
    if (!params.all && params.include.length === this.totalCount) {
      this.selectAll();
    }
  }
}
