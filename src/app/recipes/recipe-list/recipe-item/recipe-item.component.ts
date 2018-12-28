import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  display = false;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }
  onSelected(){
    this.recipeService.recipeSelected.emit(this.recipe);
  }
  showDialog() {
    this.display = true;
  }
  closeDialog(){
    this.display = false;
  }

}
