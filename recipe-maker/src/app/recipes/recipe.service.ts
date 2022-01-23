import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

constructor(private shoppingListService: ShoppingListService) {

}
    
    private recipes: Recipe[] = [
        {   name: 'Beef Stroganoff', 
            description: 'Hearty beef', 
            imageUrl: 'https://www.recipesmadeeasy.co.uk/wp-content/uploads/2018/10/beef-stroganoff-4-2.jpg',
            ingredients: [
                { name: 'Mince', amount: 500, unit: 'grams' }
            ]
        },
        { 
            name: 'Chicken A La King', 
            description: 'Delicious creamy chicken', 
            imageUrl: 'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Slow-Cooked-Chicken-a-La-King_exps9664_SSC2919296A03_20_2b_RMS.jpg',
            ingredients: [
                { name: 'Mince', amount: 500, unit: 'grams' }
            ]}
      ];

      getRecipes() : Recipe[] {
        return this.recipes.slice();
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
      }

}