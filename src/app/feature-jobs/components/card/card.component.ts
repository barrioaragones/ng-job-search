import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { JobListItem } from '../../models/job';
import { JobsService } from '../../services/jobs.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
  @Input() job: JobListItem | undefined;
  @Output() toggleFavorite = new EventEmitter<JobListItem>();
  @Input() isFavorite: boolean = false;

  constructor(private jobsService: JobsService) {}

  ngOnInit(): void {
    if(this.job) {
      this.isFavorite = this.jobsService.isFavorite(this.job);
    }
  }

  setFavorite(job: JobListItem): void {
    this.isFavorite = !this.isFavorite
    this.jobsService.setFavoriteJob(job);
  }


}
