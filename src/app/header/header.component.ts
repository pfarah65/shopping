import {Component } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService) {}
  onSaveData(){
    this.dataStorageService.storeRecipes().subscribe( (respone: Response) => {

    });
  }
  onFetchData(){
    this.dataStorageService.getRecipes().subscribe(
      (respone: Recipe[]) =>{
        if(respone !== null) {
          this.recipeService.setRecipes(this.dataStorageService.fixResponse(respone));
        }
      }
    );
    this.dataStorageService.getShoppingItems().subscribe(
      (response: Ingredient[]) => {
        if(response !== null){
          this.shoppingListService.dataIngredients(response);
        }
    });
  }


}
