import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { List } from './list.model';


@Injectable({providedIn: 'root'})

export class ListService {
 private lists: List[] = [];
 private listUpdated = new Subject<List[]>();

 constructor(private http: HttpClient ) {}

  getLists() {
    this.http.get<{message: string, lists: List[]}>('http://localhost:3000/todos')
      .pipe(map((listData) => {
        return listData.lists.map(post => {
          return {
            list: post.list,
            id: post._id
          };
        });
      }))
      .subscribe(transformedData => {
        this.lists = transformedData;
        this.listUpdated.next([...this.lists]);
      });
  }

  getListUpdateListener() {
    return this.listUpdated.asObservable();
  }

  addList(list: string) {
// tslint:disable-next-line: object-literal-shorthand
    const post: List = {id: null, list: list};
    this.http.post<{message: string, listId: string}>('http://localhost:3000/todos', post)
        .subscribe((responseData) => {
            // console.log(responseData.message);
            const id = responseData.listId;
            post.id = id;
            this.lists.push(post);
            this.listUpdated.next([...this.lists]);
  });
  }

  deleteList(listId: string) {
    this.http.delete('http://localhost:3000/todos/' + listId)
      .subscribe(() => {
        const updatedList =this.lists.filter(list => list.id !== listId);
        this.lists = updatedList;
        this.listUpdated.next([...this.lists]);
      });
  }

}
