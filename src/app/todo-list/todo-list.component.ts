import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { List } from '../list.model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  // lists = [
  //   {list: 'first item'},
  //   {list: 'second item'},
  //   {list: 'third'}
  // ];
 lists: List[] = [];
 private listSub: Subscription;

    constructor(public listService: ListService) {}

  ngOnInit() {
    this.listService.getLists();
    this.listSub = this.listService.getListUpdateListener()
      .subscribe((lists: List[]) => {
          this.lists = lists;
      });
  }

  onDelete(listId: string) {
       this.listService.deleteList(listId);
  }

  ngOnDestroy() {
    this.listSub.unsubscribe();
  }

}
