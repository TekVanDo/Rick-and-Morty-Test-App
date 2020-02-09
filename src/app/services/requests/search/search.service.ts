import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { API_LINK } from '../../../consts/consts';
import { Character, CharactersResponse } from '../../../interfaces/character';
import { Observable } from 'rxjs';
import { QueryBuilder } from '../../../classes/query-builder/query-builder';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {
  }

  getSearchQueryStream$(queryBuilder: QueryBuilder): Observable<Character[]> {
    return queryBuilder.getFilterController().getOnChange$().pipe(
      debounceTime(100),
      switchMap((filter) => {
        // switch to the first page if filter was applied
        const paginationController = queryBuilder.getPaginationController();
        paginationController.setPage(1);
        return paginationController.getOnChange$()
            .pipe(map((pagination) => ({filter, pagination})));
      }),
      switchMap(({ filter, pagination }) => {
        const filtration = {
          page: pagination.currentPage.toString(),
          ...filter
        };

        const params = new HttpParams({
          fromObject: filtration
        });

        return this.http.get(API_LINK, { params });
      }),
      map((data: CharactersResponse) => {
        queryBuilder.setTotalCount(data.info.count);
        return data.results;
      })
    );
  }
}
