import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private ingredients: Ingredient[] = [new Ingredient('Apples', 5),new Ingredient('Dog', 5)];
  private recipes: Recipe[] = [
    new Recipe('A test recuoe', 'this is a test', 
      'https://media2.s-nbcnews.com/j/newscms/2018_35/1363730/rachel-hollis-chicken-fingers-today-main-180828_b9b2a726ec8654e3f9f7435ce26588fb.today-inline-large.jpg', this.ingredients)
    ,new Recipe('Another test recuoe', 'this is a test',
      'https://media2.s-nbcnews.com/j/newscms/2018_35/1363730/rachel-hollis-chicken-fingers-today-main-180828_b9b2a726ec8654e3f9f7435ce26588fb.today-inline-large.jpg', this.ingredients)

  ];


  constructor(private shoppingListService: ShoppingListService) {}
  
  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);

  }
}
