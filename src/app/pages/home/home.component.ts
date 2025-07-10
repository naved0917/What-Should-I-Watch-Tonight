import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from 'src/core/services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  movies: string[] = [];
  searchTerm = '';

  constructor(
    private _tmdbService: TmdbService,
    private _router: Router
  ) { }

  loadMood(genreId: number): void {
    this._tmdbService.discoverByGenre(genreId).subscribe((res: any) => {
      this.movies = res?.results;
    });
  }

  search(): void {
    this._tmdbService.search(this.searchTerm).subscribe((res: any) => {
      this.movies = res?.results?.filter((r: any) => r?.media_type === 'movie');
    });
  }

  myWatchlist(): void {
    this._router.navigateByUrl('/watchlist');
  }
}