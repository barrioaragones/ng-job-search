import { tap } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';

import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { JobDetail } from '../../models/job-detail';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent {
  job: JobDetail | null = null;
  subscriptions$: Subscription = new Subscription();

  constructor(route: ActivatedRoute, private jobService: JobsService) {
    const jobId = route.snapshot.paramMap.get('jobId');
    if (jobId) {
      this.getJobDetails(jobId)
    }
  }

  getJobDetails(jobId: string) {
    this.subscriptions$.add(
      this.jobService
        .getJobDetails(jobId)
        .pipe(
          tap((jobDetail: JobDetail) => {
            this.job = jobDetail;
          })
        )
        .subscribe()
    );
  }
}
