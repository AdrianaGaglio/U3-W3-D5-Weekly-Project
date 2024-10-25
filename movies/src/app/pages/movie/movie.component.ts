import { Component } from '@angular/core';
import { iMovie } from '../../interfaces/imovie';
import { MoviesService } from '../../services/movies.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent {
  constructor(private movieSvc: MoviesService, private route: ActivatedRoute) {}

  movieId!: number;
  movie!: iMovie;
  relateds!: iMovie[];
  byCast!: iMovie[];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = params['id'];
      this.movieSvc.getMovieById(this.movieId).subscribe((movie) => {
        this.movie = movie;
        this.movieSvc
          .getRelatedsByGenre(this.movie.id, this.movie.genres)
          .subscribe((movies) => {
            this.relateds = movies;
          });

        this.movie.cast = this.movie.cast.map((cast) => {
          return cast.toLowerCase();
        });
      });
    });
  }
}
