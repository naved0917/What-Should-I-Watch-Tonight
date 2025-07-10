import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private key = 'watchlist';

  get(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  add(movie: any) {
    const list = this.get();
    if (!this.exists(movie.id)) {
      list.push(movie);
      localStorage.setItem(this.key, JSON.stringify(list));
    }
  }

  remove(id: number) {
    const list = this.get().filter(m => m.id !== id);
    localStorage.setItem(this.key, JSON.stringify(list));
  }

  exists(id: number): boolean {
    return this.get().some(m => m.id === id);
  }
}
