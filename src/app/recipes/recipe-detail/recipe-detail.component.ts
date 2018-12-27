import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService: RecipeService,private messageService: MessageService) { }

  ngOnInit() {
  }
  OnaddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.addItemsToList();
  }
  addItemsToList() {
    this.messageService.add({severity:'success', summary: 'Success', detail:'Added to Shopping List'});
  }
}
