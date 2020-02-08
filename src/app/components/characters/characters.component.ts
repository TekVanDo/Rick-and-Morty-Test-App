import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QueryBuilder } from '../../classes/query-builder/query-builder';
import { QueryBuilderService } from '../../services/queryBuilder/query-builder.service';
import { SearchService } from '../../services/requests/search/search.service';
import { Character } from '../../interfaces/character';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersComponent implements OnInit {
  queryBuilder: QueryBuilder;
  dataStream: Observable<Character[]>;
  constructor(queryBuilderService: QueryBuilderService,
              private searchService: SearchService) {
    this.queryBuilder = queryBuilderService.getNewQueryBuilder();
    this.dataStream = this.searchService.getSearchQueryStream$(this.queryBuilder);
  }

  ngOnInit() {
  }

  trackById(num, item: Character) {
    return item.id;
  }
}
