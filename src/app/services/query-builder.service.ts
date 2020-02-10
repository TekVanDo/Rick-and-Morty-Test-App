import { Injectable } from '@angular/core';
import { QueryBuilder } from '../classes/query-builder/query-builder';

@Injectable({
  providedIn: 'root'
})
export class QueryBuilderService {

  constructor() {
  }

  getNewQueryBuilder() {
    return new QueryBuilder();
  }
}
