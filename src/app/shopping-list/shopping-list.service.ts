import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Output} from '@angular/core';
import {Subject} from 'rxjs';

export class ShoppingListService {
  @Output() ingredientsChanged = new Subject<Ingredient[]>();
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
}
