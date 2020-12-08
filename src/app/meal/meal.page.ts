import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealdbApiService } from '../mealdb-api.service';
import { MEALDB_Meal } from '../model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.page.html',
  styleUrls: ['./meal.page.scss'],
})
export class MealPage implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private service: MealdbApiService, 
    private sanitizer: DomSanitizer) {}

  meal: MEALDB_Meal = null
  tags: string[] = []
  ingredients: string[] = []
  measures: string[] = []

  ngOnInit() {
    let mealId: string = this.route.snapshot.paramMap.get("id")
    
    this.service.findById(mealId).subscribe((meal) => {
      this.meal = meal
      this.tags = this.getTags(meal)
      this.ingredients = this.getIngredients(meal)
      this.measures = this.getMeasures(meal)
    })

  }

  getEmbedYoutubeURL(url: string) {
    let embed: string = url.replace("watch?v=", "embed/")
    return this.sanitizer.bypassSecurityTrustResourceUrl(embed)
  }

  private getTags(meal: MEALDB_Meal): string[]{
    let tags = meal.strTags
    if (tags != null){
      return tags.split(",")
    }
    return []
  }

  private getMeasures(meal: MEALDB_Meal): string[] {
    
    let measures: string[] = []

    for (let i = 1; i <= 20; i++){

      let measure = meal["strMeasure" + i]

      if(measure != null && measure != ""){
        measures.push(measure)
      }
    }

    return measures

  }

  private getIngredients(meal: MEALDB_Meal): string[]{

    let ingredients: string[] = []

    for (let i = 1; i <= 20; i++){

      let ingredient: string = meal["strIngredient" + i]

      if(ingredient != null && ingredient != ""){
        ingredients.push(ingredient)
      }
    }

    return ingredients
  }

}