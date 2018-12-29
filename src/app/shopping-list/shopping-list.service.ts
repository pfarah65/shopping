import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Output} from '@angular/core';
import {Subject} from 'rxjs';

export class ShoppingListService {
  @Output() ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5)
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    let flag = false;
    for( const ingr of this.ingredients) {
      if (ingr.name === ingredient.name) {
        flag = true;
        ingr.amount = +ingredient.amount + +ingr.amount;
        break;
      }
    }
    if (!flag) {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.forEach((ingr) => {
      ingredients.forEach((ingr2) => {
        if (ingr.name === ingr2.name ) {
          ingr.amount += ingr2.amount;
          ingredients.splice(ingredients.indexOf(ingr2), 1);
        }
      });
    });
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  reset(){
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  delete(index: number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
