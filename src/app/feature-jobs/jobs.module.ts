import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobsFavoritesComponent } from './components/jobs-favorites/jobs-favorites.component';
import { JobsListComponent } from './components/jobs-list/jobs-list.component';
import { JobsService } from './services/jobs.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: `/jobs-list`,
    pathMatch: 'full'
  },
  {
    path: 'jobs-list',
    component: JobsListComponent
  },
  {
    path: 'favorites-list',
    component: JobsFavoritesComponent
  },
  {
    path: 'jobs-list/:jobId',
    component: JobDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    JobsService
  ]
})
export class JobsModule {
}
