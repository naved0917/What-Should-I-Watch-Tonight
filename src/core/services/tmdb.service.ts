import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private apiKey = environment.tmdbApiKey;
  private baseUrl = environment.tmdbBaseUrl;

  constructor(private http: HttpClient) {}

  search(query: string) {
    return this.http.get(`${this.baseUrl}/search/multi`, {
      params: { api_key: this.apiKey, query }
    });
  }

  discoverByGenre(genreId: number) {
    return this.http.get(`${this.baseUrl}/discover/movie`, {
      params: { api_key: this.apiKey, with_genres: genreId }
    });
  }

  getMovieDetails(id: number) {
    return this.http.get(`${this.baseUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        append_to_response: 'videos,credits,similar'
      }
    });
  }
}