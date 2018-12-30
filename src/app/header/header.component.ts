import {Component } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) {}
  onSaveData(){
    this.dataStorageService.storeRecipes().subscribe( (respone: Response) => {

    });
  }
  onFetchData(){
    this.dataStorageService.getRecipes().subscribe(
      (respone: Recipe[]) =>{
        this.recipeService.setRecipes(respone)
      }
    );
    console.log("hi");
  }
}
