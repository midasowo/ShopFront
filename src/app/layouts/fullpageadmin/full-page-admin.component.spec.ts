import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FullPageAdminComponent} from './full-page-admin.component';

describe('FullPageAdminComponent', () => {
  let component: FullPageAdminComponent;
  let fixture: ComponentFixture<FullPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullPageAdminComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FullPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
