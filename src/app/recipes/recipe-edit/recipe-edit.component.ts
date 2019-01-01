import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {DataStorageService} from '../../shared/data-storage.service';
import * as firebase from 'firebase';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  get formData() { return <FormArray>this.recipeForm.get('ingredients'); }
  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private dataStorageService: DataStorageService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm(){
    let recipeName = '';
    let imagePath = '';
    let desc = '';
    const recipeIngredients = new FormArray([]);
    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      desc = recipe.description;
      if(recipe['ingredients']){
        for (let ingr of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({'name': new FormControl(ingr.name, Validators.required ),
              'amount': new FormControl(ingr.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]
                )})
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(imagePath, Validators.required),
      'description' : new FormControl(desc, Validators.required),
      'ingredients' : recipeIngredients
    });

  }
  onSubmit(){
    // const newRecp = new Recipe(
    //   this.recipeForm.value['name'], this.recipeForm.value['imagePath'], this.recipeForm.value['description'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.dataStorageService.storeRecipes().subscribe( (respone: Response) => {});

    this.onCancel();
    this.messageService.add({severity:'success', summary: 'Saved', detail:`Saved 
                ${this.recipeForm.value.name} to Recipe List!`});
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push( new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

  }

}
