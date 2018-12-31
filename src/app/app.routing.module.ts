import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {SignupComponent} from './auth/signup/signup.component';
import {SigninComponent} from './auth/signin/signin.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'recipes', component: RecipesComponent, children:
    [
      {path: '', component: RecipeStartComponent, canActivate: [AuthGuardService]},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService]},
      {path: ':id', component: RecipeDetailComponent, canActivate: [AuthGuardService]},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuardService]}
      ], canActivate: [AuthGuardService],
    },
  {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuardService]},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
