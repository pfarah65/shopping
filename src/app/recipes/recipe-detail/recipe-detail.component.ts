import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id: number;
  constructor(private recipeService: RecipeService,private messageService: MessageService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);

    });

    
  }
  OnaddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.addItemsToList();
  }
  addItemsToList() {
    this.messageService.add({severity:'success', summary: 'Success', detail:'Added to Shopping List'});
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.activatedRoute});
  }
}
