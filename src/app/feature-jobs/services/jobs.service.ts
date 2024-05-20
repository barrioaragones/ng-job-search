import { BehaviorSubject, Observable, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { JobListItem } from '../models/job';
import { JobDetail } from '../models/job-detail';

@Injectable()
export class JobsService {

  favoriteJobs: BehaviorSubject<JobListItem[]> = new BehaviorSubject<JobListItem[]>([]);
  private favoriteJobsKey: string = 'favoriteJobs';

  constructor(private readonly http: HttpClient) {}

  getJobs(): Observable<JobListItem[]> {
    return this.http.get<JobListItem[]>('/jobs')
  }
  setIsFavorite(job: JobListItem): boolean {
    return this.favoriteJobs.value?.length &&
    this.favoriteJobs.value.filter((favJob: JobListItem) => favJob.id === job.id)
        ?.length
      ? true
      : false;
  }

  getJobDetails(id: string): Observable<JobDetail> {
    return this.http.get<JobDetail>(`/jobs/${id}`);
  }

  retrieveStoredFavorites() {
    const storedFavorites = localStorage.getItem(this.favoriteJobsKey);
    this.favoriteJobs.next(storedFavorites ? JSON.parse(storedFavorites) : []);
  }


  setFavoriteJob(job: JobListItem | undefined) {
    if (job) {
      let currentList = this.favoriteJobs.getValue();
      if (currentList.some(f => f.id === job.id)) {
        currentList = currentList.filter(f => f.id !== job.id);
      } else {
        currentList.push(job);
      }
      this.favoriteJobs.next(currentList);
      localStorage.setItem(this.favoriteJobsKey, JSON.stringify(currentList));
    }
  }

  isFavorite(job: JobListItem) {
    const favorites = this.favoriteJobs.getValue();
    return favorites.find((value) => value.id === job.id) != undefined;
  }

}
