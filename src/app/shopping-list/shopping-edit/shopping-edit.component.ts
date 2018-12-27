import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;


  constructor(private shoppingListService: ShoppingListService, private messageService:MessageService) { }

  ngOnInit() {
  }
  onAddItem(){
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this.shoppingListService.addIngredient(newIngredient);
    this.addItemMsg();
  }
  addItemMsg() {
    this.messageService.add({severity:'success', summary: 'Success', detail:'Added to Shopping List'});
  }
}
