import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { MEALDB_ListItem, MEALDB_Meal } from './model';
import { map } from 'rxjs/operators';

const BASE_URL = "https://www.themealdb.com/api/json/v1/1/"


@Injectable({
  providedIn: 'root'
})
export class MealdbApiService {

  constructor(private http: HttpClient) {}

  findByAera(aera: string): Observable<MEALDB_ListItem[]>{
    return this.http.get<MEALDB_ListItem[]>(BASE_URL + "filter.php?a=" + aera).pipe(
      map((response: any) => response.meals)
    )
  }

  findByCategory(name: string): Observable<MEALDB_ListItem[]>{
    return this.http.get<MEALDB_ListItem[]>(BASE_URL + "filter.php?c=" + name).pipe(
      map((response: any) => response.meals)
    )
  }

  findById(id: string): Observable<MEALDB_Meal>{
    return this.http.get<MEALDB_Meal>(BASE_URL + "lookup.php?i=" + id).pipe(
      map((response: any) => response.meals[0]) // retour du seul repas situé dans ce tableau
    )
  }

}