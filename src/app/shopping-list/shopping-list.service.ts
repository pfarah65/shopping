import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter, Output} from '@angular/core';
import {Subject} from 'rxjs';

export class ShoppingListService {
  @Output() ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>()
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', '5')
  ];
  getIngredients() {
    return this.ingredients.slice();
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

  dataIngredients(ingredients: Ingredient[]){
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }




  addIngredient(ingredient: Ingredient) {
    let flag = false;
    for( const ingr of this.ingredients) {
      if (ingr.name === ingredient.name) {
        flag = true;
        if (ingr.amount.indexOf('/')>-1 || ingredient.amount.indexOf('/')>-1){
          let num1;
          let num2;
          if(ingr.amount.indexOf('/')>-1){
            let split = ingr.amount.split('/');
            num1 = parseFloat(split[0]) / parseFloat(split[1]);
          }else{ num1 = parseFloat(ingr.amount); }
          if(ingredient.amount.indexOf('/')>-1) {
            let split2 = ingredient.amount.split('/');
            num2 = parseFloat(split2[0]) / parseFloat(split2[1]);
          }else {num2 = parseFloat("0.5"); }
          ingr.amount = (num1 + num2).toString();
        } else {
          ingr.amount = parseFloat(ingredient.amount) + parseFloat(ingr.amount).toString();
          break;
        }
      }
    }
    if(!flag) {
      this.ingredients.push(ingredient);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
