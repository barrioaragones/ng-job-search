import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsFavoritesComponent } from './jobs-favorites.component';

describe('JobsFavoritesComponent', () => {
  let component: JobsFavoritesComponent;
  let fixture: ComponentFixture<JobsFavoritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsFavoritesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
