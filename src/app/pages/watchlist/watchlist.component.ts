import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { WatchlistService } from 'src/core/services/watchlist.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent {
  movies: string[] = [];

  constructor(
    private _watchlist: WatchlistService,
    private _location: Location
  ) { }

  ngOnInit() {
    this.movies = this._watchlist.get();
  }

  back(): void {
    this._location.back();
  }
}