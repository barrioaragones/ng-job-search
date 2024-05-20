import { Observable } from 'rxjs';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { JobListItem } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { CardComponent } from '../card/card.component';

@Component({
  template: `
    @if (favoritesList$ | async; as favoritesList) {
      @for (job of favoritesList; track job.id) {
        <app-card [job]="job"></app-card>
      } @empty {
        <p>No favorite items yet!</p>
      }
    }
  `,
  selector: 'app-jobs-favorites',
  standalone: true,
  imports: [CardComponent, NgIf, NgFor, CommonModule],
  styleUrl: './jobs-favorites.component.css',
})
export class JobsFavoritesComponent implements OnInit {
  favoritesList$: Observable<JobListItem[]> | undefined;

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.favoritesList$ = this.jobsService.favoriteJobs;
    this.jobsService.retrieveStoredFavorites();
  }
}
