import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealdbApiService } from '../mealdb-api.service';
import { MEALDB_ListItem } from '../model';
import { MEALDB_Category } from '../model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  meals: MEALDB_ListItem[] = null
  category: string[] = []
  mealArea: string

  constructor(private mealdb: MealdbApiService, private route: ActivatedRoute) {

    this.mealArea  = this.route.snapshot.paramMap.get("aera")
    
    console.log(this.mealArea)

    if(this.mealArea != null){
      this.mealdb.findByAera(this.mealArea).subscribe((meals) => {
        this.meals = meals
      }, (error)=> {
        console.log(error)
      })
    }

    for (let value of Object.values(MEALDB_Category)){
      this.category.push(value)
    }

  }

  onCategorySelected(category: any){
    this.mealdb.findByCategory(category.detail.value).subscribe((meals) => {
      this.meals = meals
    }, (error)=> {
      console.log(error)
    })

  }

}