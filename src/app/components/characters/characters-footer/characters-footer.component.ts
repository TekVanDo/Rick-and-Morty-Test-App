import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PaginationController } from '../../../classes/query-builder/controllers/pagination-controller';

@Component({
  selector: 'app-characters-footer',
  templateUrl: './characters-footer.component.html',
  styleUrls: ['./characters-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersFooterComponent {
  @Input() paginationController: PaginationController;
  constructor() { }
}
