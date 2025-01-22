import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BatteryDashboardPage } from './battery-dashboard.page';

describe('BatteryDashboardPage', () => {
  let component: BatteryDashboardPage;
  let fixture: ComponentFixture<BatteryDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BatteryDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
