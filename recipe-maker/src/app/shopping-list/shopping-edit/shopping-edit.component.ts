import { Component, ElementRef, OnInit, ViewChild,  } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
@ViewChild('ingredientName') nameInputRef: ElementRef;
@ViewChild('ingredientAmount') amountInputRef: ElementRef;
@ViewChild('ingredientUnit') unitInputRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem() {
    let ingredient = <Ingredient>{
        name: this.nameInputRef.nativeElement.value,
        amount: this.amountInputRef.nativeElement.value,
        unit: this.unitInputRef.nativeElement.value
    }
    this.shoppingListService.addIngredient(ingredient);
  }
}
