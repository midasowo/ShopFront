import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FullPageAdminEmptyComponent} from './full-page-admin-empty.component';

describe('FullPageAdminComponent', () => {
  let component: FullPageAdminEmptyComponent;
  let fixture: ComponentFixture<FullPageAdminEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullPageAdminEmptyComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FullPageAdminEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
