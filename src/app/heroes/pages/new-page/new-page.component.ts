import { ActivatedRoute, Router } from '@angular/router';
import { HeroService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``,
})
export class NewPageComponent implements OnInit{
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('',{ nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.MarvelComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });


  public publishers = [
    { id: 'Dc Comics', desc: 'Dc - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(private heroService: HeroService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;

    return hero;
  }

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params
    .pipe(
      switchMap(({ id }) => this.heroService.getHeroById(id)),
    ).subscribe( hero => {
      if( !hero ) return this.router.navigateByUrl('/');

      this.heroForm.reset( hero );
      return;
    });
  }

  onSubmit():void{
    if( this.heroForm.invalid ) return;

    if( this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${ hero.superhero} updated successfully!`);
        });

        return;
    }
    this.heroService.addHero(this.currentHero)
    .subscribe(hero => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackbar(`${ hero.superhero} created successfully!`);
    });
  }

  showSnackbar(message: string) : void {
    this.snackBar.open(message, 'done',{
      duration: 2500,
    });
  }
}
