import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ConfirmationService, Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DataStorageService} from '../../shared/data-storage.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id: number;
  constructor(private recipeService: RecipeService,private messageService: MessageService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private confirmService: ConfirmationService,
              private dataStorageService: DataStorageService,
              private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);


    });
  }
  OnaddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.addItemsToList();
    this.dataStorageService.storeShoppingItems().subscribe( (respone: Response) => {
    });

  }
  addItemsToList() {
    this.messageService.add({severity:'success', summary: 'Success', detail:'Added to Shopping List'});
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
  }
  onDeleteRecipe(){
    this.confirmService.confirm({
      message: `Are you sure that you want to remove ${this.recipe.name} from the Recipe List?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.recipeService.deleteRecipe(this.id);
        this.router.navigate(['../'],{relativeTo: this.activatedRoute});
        this.messageService.add({severity:'info', summary:'Confirmed', detail:`You have removed ${this.recipe.name} from the Recipe List`});
        this.dataStorageService.storeRecipes().subscribe();
      },
      reject: () => {
        this.messageService.add({severity:'info', summary:'Canceled', detail: 'You have canceled'});
      }

    });
  }
  onShareRecipe(){
    console.log("Sharing");
  }
}
