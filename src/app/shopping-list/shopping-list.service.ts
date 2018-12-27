import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Output} from '@angular/core';

export class ShoppingListService {
  @Output() ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5)
  ];
  getIngredients() {
    return this.ingredients.slice();
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
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
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
