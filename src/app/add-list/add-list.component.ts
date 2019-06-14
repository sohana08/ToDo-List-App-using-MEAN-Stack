import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})

export class AddListComponent {
    enteredValue = '';

    constructor(public listService: ListService) {}

    onAdd(form: NgForm) {
      if (form.invalid) {
        return;
      }
      this.listService.addList( form.value.list);
      form.resetForm();
    }

}
