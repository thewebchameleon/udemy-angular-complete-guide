import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  selectedIngredient: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => 
    {
      this.ingredients = ingredients
    });
    this.shoppingListService.ingredientSelected.subscribe((ingredient: Ingredient) => {
      this.selectedIngredient = ingredient;
    });
  }

  selectIngredient(ingredient: Ingredient) {
    this.shoppingListService.ingredientSelected.emit(ingredient);
  }
}
