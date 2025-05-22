import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../pokeTypes/pokeTypes.component';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemons: Pokemon[] = [];
  private apiUrl = 'https://tyradex.vercel.app/api/v1/pokemon';

  constructor(private http: HttpClient) {}

  fetchAll(): Observable<Pokemon[]> {
    if (this.pokemons.length > 0) {
      return of(this.pokemons);
    } else {
      return this.http.get<Pokemon[]>(this.apiUrl)
        .pipe(tap(data => this.pokemons = data));
    }
  }

  getById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`);
  }
  

}
