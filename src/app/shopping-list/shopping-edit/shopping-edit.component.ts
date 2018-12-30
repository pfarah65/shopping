import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DataStorageService} from '../../shared/data-storage.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm:NgForm;

  constructor(private shoppingListService: ShoppingListService,
              private messageService: MessageService,
              private  confirmService: ConfirmationService,
              private dataStorageService: DataStorageService) { }
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
    this.storeList();
    form.reset();
  }
  addItemMsg(item:string) {
    if(this.editMode){
      this.messageService.add({severity:'info', summary: 'Success', detail: 'Edited item in Shopping List!'});
    } else {
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Added ' + item + ' to Shopping List!'});
    }
  }
  onClear(form: NgForm){
    this.confirmService.confirm({
      message: 'Are you sure that you want to clear the Shopping List?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shoppingListService.reset();
        this.storeList();
        this.messageService.add({severity:'info', summary:'Confirmed', detail:'You have cleared Shopping List'});
        },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Rejected', detail:'You have canceled'});
      }

    });
    form.reset();

  }
  onDelete(form: NgForm){
    this.confirmService.confirm({
      message: `Are you sure that you want to remove ${this.editItem.name} from the Shopping List?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.shoppingListService.delete(this.editIndex);
        this.messageService.add({severity:'info', summary:'Confirmed', detail:`You have removed ${this.editItem.name} from the Shopping List`});
        this.editMode = false;
        this.storeList();
        form.reset();
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Rejected', detail: 'You have canceled'});
      }

    });
  }
  storeList(){
    this.dataStorageService.storeShoppingItems().subscribe( (respone: Response) => {

    });
  }
  unselect(){
    this.editMode = false;
  }
  ngOnDestroy(){
    this.editSubject.unsubscribe();
  }
}
