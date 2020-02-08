import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { PropertiesFilterController } from '../../../classes/query-builder/controllers/PropertiesFilterController';
import { Gender, Statuses } from '../../../interfaces/character';

interface FiltersData {
  name: string;
  gender: Gender;
  status: Statuses;
  species: string;
}

@Component({
  selector: 'app-characters-header',
  templateUrl: './characters-header.component.html',
  styleUrls: ['./characters-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersHeaderComponent implements OnInit {
  @Input() filterController: PropertiesFilterController;
  filters: FiltersData;
  gendersList = Gender;
  statusesList = Statuses;
  constructor() {
  }

  ngOnInit() {
    this.filters = this.filterController.getValue() as FiltersData;
  }

  setFilterValue(filterName: string, value: string) {
    this.filterController.setFilter(filterName, value);
  }
}
