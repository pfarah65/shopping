import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthService} from '../auth/auth.service';
@Injectable()
export class DataStorageService {
  recipeURL = 'https://ng-recipe-book-44be3.firebaseio.com/recipes';
  recipeURLItem = 'https://ng-recipe-book-44be3.firebaseio.com/recipes/'
  json = '.json'
  shoppingListURL = 'https://ng-recipe-book-44be3.firebaseio.com/shoppingList';

  constructor(private  http: HttpClient, private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService){

  }


  storeRecipes(){
    const token = this.authService.getToken();
    this.authService.getToken();
    console.log(this.recipeService.getRecipes());
    return this.http.put(this.recipeURL + this.authService.getUser() + this.json + '?auth=' + token.toString(),
      this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.http.get(this.recipeURL + this.authService.getUser() + this.json + '?auth=' + token.toString());
  }

  getSharedRecipes(){
    const token = this.authService.getToken();
    return this.http.get(this.recipeURL + this.json + '?auth=' + token.toString());


  }

  
  storeShoppingItems(){
    const token = this.authService.getToken();

    return this.http.put(this.shoppingListURL + this.authService.getUser() + this.json + '?auth=' + token.toString(),
      this.shoppingListService.getIngredients());
  }

  getShoppingItems(){
    const token = this.authService.getToken();

    return this.http.get(this.shoppingListURL + this.authService.getUser() + this.json + '?auth=' + token.toString());
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
