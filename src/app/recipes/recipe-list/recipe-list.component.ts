import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  @Input() shared: boolean;
  recipes: Recipe[];
  recipeSub: Subscription;
  recipeShareSub: Subscription;


  constructor(private recipeService: RecipeService, private router: Router, private  activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this.shared){
      this.recipes = this.recipeService.getSharedRecipes();

      this.recipeShareSub = this.recipeService.recipeShareChanged.subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

    } else {

      this.recipes = this.recipeService.getRecipes();
      this.recipeSub = this.recipeService.recipeChanged.subscribe( (recipes: Recipe[]) => {
        this.recipes = recipes;
        });
    }

  }
  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute});

  }

  ngOnDestroy() {
   // this.recipeSub.unsubscribe();
  }
}
