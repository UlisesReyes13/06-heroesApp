import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];
  constructor(private serviceHeroes: HeroService) { }

  ngOnInit(): void {
    this.serviceHeroes.getHeroes().subscribe(heroes => this.heroes = heroes);
  }


}
