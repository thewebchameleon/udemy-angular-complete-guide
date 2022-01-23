import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subs.push(this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => 
    {
      this.ingredients = ingredients
    }));
    this.subs.push(this.shoppingListService.ingredientSelected.subscribe((ingredient: Ingredient) => {
      this.selectedIngredient = ingredient;
    }));
  }

  selectIngredient(ingredient: Ingredient) {
    this.shoppingListService.ingredientSelected.next(ingredient);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
