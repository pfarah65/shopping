import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Ingredient} from '../shared/ingredient.model';
import {AuthService} from '../auth/auth.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit{
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private shoppingListService: ShoppingListService,
              public authService: AuthService,
              private messageService: MessageService) {}
  onSaveData(){
    this.dataStorageService.storeRecipes().subscribe( (respone: Response) => {

    });

  }
  ngOnInit(){
    if(this.authService.isAuthenticated()){
      this.update();
    }
  }
  onFetchData(){
    if(this.authService.isAuthenticated()) {
      this.dataStorageService.getRecipes().subscribe(
        (respone: Recipe[]) => {
          if (respone !== null) {
            this.recipeService.setRecipes(this.dataStorageService.fixResponse(respone));
          }
        }
      );
      this.dataStorageService.getSharedRecipes().subscribe(
        (response: Recipe[]) => {
          if (response !== null) {
            this.recipeService.setSharedRecipes(response);
          }
        });
      this.dataStorageService.getShoppingItems().subscribe(
        (response: Ingredient[]) => {
          if (response !== null) {
            this.shoppingListService.dataIngredients(response);
          }
        });
    }
  }
  update(){
    console.log('updating');
    this.onFetchData();
  }

  onLogout(){
    this.authService.logout();
      }
}
