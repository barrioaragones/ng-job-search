import { Observable } from 'rxjs';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { JobListItem } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { CardComponent } from '../card/card.component';

@Component({
  template: `
    @if (jobs$ | async; as jobsList) {
      @for (job of jobsList; track job.id) {
        <app-card [job]="job"></app-card>
      } @empty {
        <p>No jobs items yet!</p>
      }
    }
  `,
  selector: 'app-jobs',
  standalone: true,
  imports: [CardComponent, NgFor, NgIf, CommonModule],
  providers: [JobsService],
  styleUrl: './jobs-list.component.css',
})
export class JobsListComponent implements OnInit {
  jobs$: Observable<JobListItem[]> | undefined;

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.jobs$ = this.jobsService.getJobs();
    this.jobsService.retrieveStoredFavorites();
  }
}
