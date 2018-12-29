import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {MessageService} from 'primeng/api';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm:NgForm;

  constructor(private shoppingListService: ShoppingListService, private messageService:MessageService) { }
  editSubject: Subscription;
  editMode = false;
  editIndex: number;
  editItem: Ingredient;

  ngOnInit() {
    this.editSubject = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
            name: this.editItem.name,
            amount: this.editItem.amount
          });
      }
    );
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (!this.editMode) {
      this.shoppingListService.addIngredient(newIngredient);
    } else {
      this.shoppingListService.updateIngredient(this.editIndex, newIngredient);
      console.log(this.editIndex);
      console.log(newIngredient);
    }
    this.addItemMsg(value.name);
    this.editMode = false;
    form.reset();
  }
  addItemMsg(item:string) {
    if(this.editMode){
      this.messageService.add({severity:'info', summary: 'Success', detail: 'Edited item in Shopping List!'});
    } else {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Added ' + item + ' to Shopping List!'});
    }
  }

  ngOnDestroy(){
    this.editSubject.unsubscribe();
  }
}
