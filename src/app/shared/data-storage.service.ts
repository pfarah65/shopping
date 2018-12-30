import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
@Injectable()
export class DataStorageService {
  recipeURL = 'https://ng-recipe-book-44be3.firebaseio.com/recipes.json';
  shoppingListURL = 'https://ng-recipe-book-44be3.firebaseio.com/shoppingList.json';

  constructor(private  http: HttpClient, private recipeService: RecipeService,
              private shoppingListService: ShoppingListService){

  }

  storeRecipes(){
    console.log(this.recipeService.getRecipes());
    return this.http.put(this.recipeURL,
      this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get(this.recipeURL);
  }
  
  storeShoppingItems(){
    return this.http.put(this.shoppingListURL,
      this.shoppingListService.getIngredients());
  }

  getShoppingItems(){
    return this.http.get(this.shoppingListURL);
  }

  fixResponse(recipes: Recipe[]) {
    for (let recip of recipes) {
      if (!recip['ingredients']){
        recip['ingredients'] = [];
      }
    }
    return recipes;
  }
}
