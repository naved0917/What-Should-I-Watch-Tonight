import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TmdbService } from 'src/core/services/tmdb.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent {
  movie: any;
  videoKey!: SafeResourceUrl;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _tmdbService: TmdbService,
    protected _sanitizer: DomSanitizer,
    private _location: Location
  ) { }

  ngOnInit() {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this._tmdbService.getMovieDetails(+id).subscribe((res: any) => {
        this.movie = res;
        const trailer = res?.videos?.results.find((v: any) => v?.site == 'YouTube');
        this.videoKey = trailer?.key || null;

      });
    }
  }

  getEmbedUrl(key: SafeResourceUrl) {
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + key);
  }

  back(): void {
    this._location.back();
  }
}