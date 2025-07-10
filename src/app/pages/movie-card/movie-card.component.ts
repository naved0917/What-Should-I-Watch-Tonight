import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistService } from 'src/core/services/watchlist.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;
  isIconVisible: boolean = false;
  constructor(
    private _router: Router,
    private _watchlist: WatchlistService
  ) { }

  ngOnInit(): void {
    this.isIconVisible = this._router.url.includes('watchlist');
  }

  goToDetails(): void {
    this._router.navigate(['/movie', this.movie.id]);
  }

  toggleWatchlist(event: Event): void {
    event.stopPropagation();
    if (this._watchlist.exists(this.movie.id)) {
      this._watchlist.remove(this.movie.id);
    } else {
      this._watchlist.add(this.movie);
    }
  }

  removeWatchlist(): void {
    this._watchlist.remove(this.movie.id);
  }
}