import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    name: 'Mark',
    displayName: 'Otto',
  }, {
    id: 2,
    name: 'Jacob',
    displayName: 'Thornton',
  }, {
    id: 3,
    name: 'Larry',
    displayName: 'Bird',
  }, {
    id: 4,
    name: 'John',
    displayName: 'Snow',
  }, {
    id: 5,
    name: 'Jack',
    displayName: 'Sparrow',
  }, {
    id: 6,
    name: 'Ann',
    displayName: 'Smith',
  }, {
    id: 7,
    name: 'Barbara',
    displayName: 'Black',
  }, {
    id: 8,
    name: 'Sevan',
    displayName: 'Bagrat',
  }, {
    id: 9,
    name: 'Ruben',
    displayName: 'Vardan',
  }, {
    id: 10,
    name: 'Karen',
    displayName: 'Sevan',
  }];

  getData() {
    return this.data;
  }
}
