import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QueryBuilder } from '../../classes/query-builder/query-builder';
import { Character } from '../../interfaces/character';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit {
  queryBuilder: QueryBuilder;
  dataStream: Observable<Character[]>;
  constructor(private searchService: SearchService) {
    this.queryBuilder = new QueryBuilder();
    this.dataStream = this.searchService.getSearchQueryStream$(this.queryBuilder);
  }

  ngOnInit() {
  }

  trackById(num, item: Character) {
    return item.id;
  }
}
