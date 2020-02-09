import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { QueryBuilder } from '../classes/query-builder/query-builder';
import { Character, CharactersResponse } from '../interfaces/character';
import { API_LINK } from '../consts/consts';
import { NzNotificationService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient, private notificationService: NzNotificationService) {
  }

  getSearchQueryStream$(queryBuilder: QueryBuilder): Observable<Character[]> {
    return queryBuilder.getFilterController().getOnChange$().pipe(
      debounceTime(100),
      switchMap((filter) => {
        // switch to the first page if filter was applied
        const paginationController = queryBuilder.getPaginationController();
        paginationController.setPage(1);
        return paginationController.getOnChange$()
          .pipe(map((pagination) => ({ filter, pagination })));
      }),
      switchMap(({ filter, pagination }) => {
        const filtration = {
          page: pagination.currentPage.toString(),
          ...filter
        };

        const params = new HttpParams({
          fromObject: filtration
        });

        return this.http.get(API_LINK, { params }).pipe(
          catchError((err) => {
            // if we have invalid request we drop the filters
            const message = err && err.message || '';
            this.notificationService.error('Error happened clear your filters and try again', message);
            return of({ info: { count: 0 }, results: [] });
          })
        );
      }),
      map((data: CharactersResponse) => {
        queryBuilder.setTotalCount(data.info.count);
        return data.results;
      })
    );
  }
}
