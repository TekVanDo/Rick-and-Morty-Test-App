import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PropertiesFilterController } from '../../../classes/query-builder/controllers/PropertiesFilterController';

@Component({
  selector: 'app-characters-header',
  templateUrl: './characters-header.component.html',
  styleUrls: ['./characters-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersHeaderComponent implements OnInit {
  @Input() filterController: PropertiesFilterController;
  filterModel = '';

  constructor() {
  }

  ngOnInit() {
    const filters = this.filterController.getValue();
    if (filters.filter) {
      this.filterModel = filters.filter;
    }
  }

  filterModelChange(value) {
    this.filterController.setFilter('filter', value);
  }
}
