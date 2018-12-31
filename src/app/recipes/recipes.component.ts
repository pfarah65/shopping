import { Component, OnInit } from '@angular/core';
import {RecipeService} from './recipe.service';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              private  authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.token != null) {
      this.dataStorageService.getRecipes().subscribe(
        (respone: Recipe[]) => {
          if (respone !== null) {
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



}
