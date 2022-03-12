import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  id: number;
  editMode: false;

  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.editMode = params.id
      this.initForm();
    })
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
      unit: new FormControl(''),
    }))
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onClearIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).clear();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    let recipeId = null;

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImageUrl = recipe.imageUrl;
      recipeDescription = recipe.description;
      recipeId = recipe.id;
      if (recipe['ingredients']) {
        recipe.ingredients.forEach((ingredient) => {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
            unit: new FormControl(ingredient.unit),
          }))
        });
      }
    }

    this.recipeForm = new FormGroup({
        id: new FormControl(recipeId),
        name: new FormControl(recipeName, Validators.required),
        imageUrl: new FormControl(recipeImageUrl, Validators.required),
        description: new FormControl(recipeDescription, Validators.required),
        ingredients: recipeIngredients
    });
  }
}
