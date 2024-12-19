import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { environments } from '../../../env/environments';

@Injectable({ providedIn: 'root' })
export class HeroService {
  constructor(private http: HttpClient) {}

  private baseUrl: string = environments.baseUrl;

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero | undefined>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }


  addHero( hero: Hero ): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`,hero);
  }

  updateHero( hero: Hero ): Observable<Hero> {
    if(!hero.id) throw Error('El id del heroe es requerido');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${ hero.id }`,hero);
  }

  deleteHeroById( id: string ): Observable<boolean> {
    if(!id) throw Error('El id del heroe es requerido');
    return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
    .pipe(
      catchError( err => of(false)),
      map( resp => true)
    );
  }
}
