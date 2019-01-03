import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';
import {MessageService} from 'primeng/api';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  recipeShareChanged = new Subject<Recipe[]>();

  private ingredients: Ingredient[] = [new Ingredient('Apples', '5'),new Ingredient('Dog', '5')];
  private recipes: Recipe[] = [];
  private sharedRecipes: Recipe[] = [];




  constructor(private shoppingListService: ShoppingListService, private messageService: MessageService) {}
  
  getRecipes(){
    return this.recipes.slice();
  }

  getSharedRecipes(){
    return this.sharedRecipes;
  }
  
  getRecipe(index: number){
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);

  }

  addRecipe(recipe: Recipe){
    let flag = false;
    this.recipes.forEach((recip) => {
      if(recip.name == recipe.name){
        flag = true;
      }
    });
    if(!flag){
      this.recipes.push(recipe);
      this.recipeChanged.next(this.recipes.slice());
      this.messageService.add({severity:'success', summary: 'Added!', detail:`${recipe.name} is now in your Recipes`});
    } else{
      this.messageService.add({severity:'error', summary: 'Failed!', detail:`${recipe.name} already in your Recipes`});
    }
  }

  updateRecipe(index: number, newRecp: Recipe){
    this.recipes[index] = newRecp;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(recipes.slice());
  }
  setSharedRecipes(recipes: Recipe[]){
    this.sharedRecipes = recipes;
    this.recipeShareChanged.next(recipes.slice());
  }





}
