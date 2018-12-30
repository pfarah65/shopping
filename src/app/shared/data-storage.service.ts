import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
@Injectable()
export class DataStorageService {
  constructor(private  http: HttpClient, private recipeService: RecipeService){

  }

  storeRecipes(){
    console.log(this.recipeService.getRecipes());
    return this.http.put('https://ng-recipe-book-44be3.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
  }

  getRecipes() {
    return this.http.get('https://ng-recipe-book-44be3.firebaseio.com/recipes.json');
  }
}
