import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinmoneyComponent } from './winmoney.component';

describe('WinmoneyComponent', () => {
  let component: WinmoneyComponent;
  let fixture: ComponentFixture<WinmoneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinmoneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinmoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
