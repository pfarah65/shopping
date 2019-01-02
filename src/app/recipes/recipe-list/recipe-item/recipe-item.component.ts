import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';
import {DataStorageService} from '../../../shared/data-storage.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  trail = 15;
  @Input() recipe: Recipe;
  @Input()index: number;
  @Input() shared: boolean;
  constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) { }
  addSharedRecipe(){
    if(this.shared){
      this.recipeService.addRecipe(this.recipeService.getSharedRecipes()[this.index]);
      this.dataStorageService.storeRecipes().subscribe( (respone: Response) => {});

    }
  }
  ngOnInit() {
  }

}
