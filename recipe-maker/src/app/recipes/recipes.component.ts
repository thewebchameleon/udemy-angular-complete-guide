import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: [ RecipeService ]
})
export class RecipesComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService) { }
 
  ngOnInit(): void {
    this.subs.push(this.recipeService.recipeSelected.subscribe((recipe: Recipe) => this.selectedRecipe = recipe));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
