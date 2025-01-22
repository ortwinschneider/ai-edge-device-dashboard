import { ChartType } from './../../../node_modules/chart.js/dist/types/index.d';
import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { BaseChartDirective } from 'ng2-charts';
import { IonButton, IonContent, IonToolbar, IonHeader, IonMenuButton, IonTitle, IonButtons, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { Chart, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-battery-dashboard',
  templateUrl: './battery-dashboard.page.html',
  styleUrls: ['./battery-dashboard.page.scss'],
  standalone: true, imports: [IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonCardTitle, BaseChartDirective, IonButton, IonContent, IonToolbar, IonHeader, IonMenuButton, IonTitle, IonButtons],
})
export class BatteryDashboardPage implements OnInit, OnDestroy {

  //@ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChildren(BaseChartDirective) components: QueryList<BaseChartDirective>;

  // Chart data
  stateOfChargeData: any[] = [{ data: [], label: 'State of Charge (%)' }];
  currentVoltageData: any[] = [
    { data: [], label: 'Battery Current (A)' },
    { data: [], label: 'Battery Voltage (V)' },
  ];
  temperatureData: any[] = [
    { data: [], label: 'Battery Temp (°C)' },
    { data: [], label: 'Ambient Temp (°C)' },
  ];
  chartLabels: string[] = [];

  chartOptions: any = {
    responsive: false,
    maintainAspectRatio: true,
  };

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.connect();

    this.websocketService.getMessages().subscribe(
      (data) => {
        console.log(data);

      const timestamp = new Date().toLocaleTimeString();
      this.chartLabels.push(timestamp);

      // Update chart data
      this.stateOfChargeData[0].data.push((data.stateOfCharge * 100).toFixed(2));
      this.currentVoltageData[0].data.push(data.batteryCurrent.toFixed(2));
      this.currentVoltageData[1].data.push(data.batteryVoltage.toFixed(2));
      this.temperatureData[0].data.push(data.batteryTemp.toFixed(2));
      this.temperatureData[1].data.push(data.ambientTemp.toFixed(2));

      // Keep only the latest 10 data points
      if (this.chartLabels.length > 25) {
        this.chartLabels.shift();
        this.stateOfChargeData[0].data.shift();
        this.currentVoltageData[0].data.shift();
        this.currentVoltageData[1].data.shift();
        this.temperatureData[0].data.shift();
        this.temperatureData[1].data.shift();
      }

      //this.chart?.update();
      this.components.forEach((child) => { child.update(); })


      }, // Called whenever there is a message from the server.
      err => console.error(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );

  }

  ngOnDestroy(): void {
    this.websocketService.close();
  }
}
