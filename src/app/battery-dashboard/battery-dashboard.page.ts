import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ViewChild, ElementRef } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { TemperatureAnomalyService } from '../services/temperature-anomaly.service';
import { StressDetectionService } from '../services/stress-detection.service';
import { TimeToFailureService } from '../services/ttf.service';
import { ConfigService } from '../services/config.service';
import { BaseChartDirective } from 'ng2-charts';
import { IonButton, IonContent, IonToolbar, IonHeader, IonMenuButton, IonTitle, IonButtons, IonCardTitle, IonCardHeader, IonCard, IonCardContent, ToastController, IonItem, IonLabel, IonList } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-battery-dashboard',
  templateUrl: './battery-dashboard.page.html',
  styleUrls: ['./battery-dashboard.page.scss'],
  standalone: true, imports: [CommonModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, BaseChartDirective, IonButton, IonContent, IonToolbar, IonHeader, IonMenuButton, IonTitle, IonButtons, IonItem, IonLabel, IonList],
})
export class BatteryDashboardPage implements OnInit, OnDestroy {

  @ViewChildren(BaseChartDirective) components: QueryList<BaseChartDirective>;

  curentVoltage: number = 0.0;
  currentSpeed: number = 0.0;
  currentBatteryCurrent: number = 0.0;
  currentBatteryTemp: number = 0.0;
  currentAmbientTemp: number = 0.0;
  currentStateOfCharge: number = 0.0;
  currentStateOfHealth: number = 0.0;
  currentDistance: number = 0.0;
  currentLoad:number = 0.0;

  alerts: { sender: string; text: string, date: any }[] = [];

  stressDataInput: any = {"inputs": [{"name": "keras_tensor", "shape": [1, 9], "datatype": "FP32", "data": [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]}]};
  ttfDataInput: any = {"inputs": [{"name": "keras_tensor", "shape": [1, 5], "datatype": "FP32", "data": [40.0, 48.0, 162.5, -2.0, -18.0]}]};

  autoInferenceIntervalMs: number = 0;

  // Chart data
  stateOfChargeData: any[] = [
    { data: [], label: 'State of Charge (%)' },
    { data: [], label: 'State of Health (%)' }
  ];

  currentSpeedData: any[] = [
    { data: [], label: 'Battery Current (A)' },
    { data: [], label:  'Speed (km/h)'},
  ];

  temperatureData: any[] = [
    { data: [], label: 'Battery Temp (°C)' },
    { data: [], label: 'Ambient Temp (°C)' },
  ];

  voltageData: any[] = [{ data: [], label: 'Battery Voltage (V)' }];
  distanceData: any[] = [{ data: [], label: 'Distance (km)' }];

  chartLabels: string[] = [];
  chartOptions: any = {
    responsive: false,
    maintainAspectRatio: true,
  };

  constructor(
    private websocketService: WebsocketService,
    private temperatureAnomalyService: TemperatureAnomalyService,
    private stressDetectionService: StressDetectionService,
    private timeToFailureService: TimeToFailureService,
    private configService: ConfigService,
    public toastController: ToastController,
  ) {}

  async presentToast(msg: any, duration: any) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      color: 'primary',
      position: 'top'
    });
    toast.present();
  }

  predictStress() {

    console.log('Payload for stress detection:', this.stressDataInput.inputs[0].data);

    this.stressDetectionService.batteryStressDetection(JSON.stringify(this.stressDataInput)).subscribe(
      response => {
        console.log('Stress detection response:', response);
        this.alerts.unshift({ sender: 'inference', text: 'Stress detection request data: ' + JSON.stringify(this.stressDataInput), date: new Date() });
        this.alerts.unshift({ sender: 'inference', text: 'Stress detection completed. Result: ' + JSON.stringify(response), date: new Date() });
        this.presentToast("<h2>Stress detection completed</h2><br/>", 3000);
      },
      error => {
        console.error('Error during stress detection:', error);
        this.alerts.unshift({ sender: 'danger', text: 'Stress detection failed.', date: new Date() });
        this.presentToast("<h2>Error during stress detection</h2>", 3000);
      }
    );
  }

  predictTimeToFailure() {

    console.log('Payload for time to failure prediction:', this.ttfDataInput.inputs[0].data);

    this.timeToFailureService.predictTimeToFailure(JSON.stringify(this.ttfDataInput)).subscribe(
      response => {
        console.log('Time to failure prediction response:', response);
        this.alerts.unshift({ sender: 'inference', text: 'Time to failure prediction request data: ' + JSON.stringify(this.ttfDataInput), date: new Date() });
        this.alerts.unshift({ sender: 'inference', text: 'Time to failure prediction completed. Result: ' + JSON.stringify(response), date: new Date() });
        this.presentToast("<h2>Time to failure prediction completed</h2><br/>", 3000);
      },
      error => {
        console.error('Error during time to failure prediction:', error);
        this.alerts.unshift({ sender: 'danger', text: 'Time to failure prediction failed.', date: new Date() });
        this.presentToast("<h2>Error during time to failure prediction</h2>", 3000);
      }
    );
  }

  enableTemperatureAnomaly() {
    this.temperatureAnomalyService.enableTemperatureAnomaly(1).subscribe(
      response => {
        console.log('Temperature anomaly enabled:', response);
        this.alerts.unshift({ sender: 'info', text: 'Temperature anomaly enabled.', date: new Date() });
        this.presentToast("<h2>Temperature anomaly enabled</h2>", 3000);
      },
      error => {
        console.error('Error enabling temperature anomaly:', error);
        this.alerts.unshift({ sender: 'info', text: 'Temperature anomaly enabled.', date: new Date() });
        this.presentToast("<h2>Error enabling temperature anomaly</h2>", 3000);
      }
    );
  }

  disableTemperatureAnomaly() {
    this.temperatureAnomalyService.disableTemperatureAnomaly(1).subscribe(
      response => {
        console.log('Temperature anomaly disabled:', response);
        this.alerts.unshift({ sender: 'info', text: 'Temperature anomaly disabled.', date: new Date() });
        this.presentToast("<h2>Temperature anomaly disabled</h2>", 3000);
      },
      error => {
        console.error('Error disabling temperature anomaly:', error);
        this.alerts.unshift({ sender: 'info', text: 'Temperature anomaly disabled.', date: new Date() });
        this.presentToast("<h2>Error disabling temperature anomaly</h2>", 3000);
      }
    );
  }

  ngOnInit(): void {

    this.autoInferenceIntervalMs = this.configService.AUTO_INFERENCE_INTERVAL_MS;

    if(this.configService.AUTO_INFERENCE_INTERVAL_MS > 0) {
      setInterval(() => {
        this.predictStress();
        this.predictTimeToFailure();
      }, this.configService.AUTO_INFERENCE_INTERVAL_MS);
    }

    this.websocketService.connect();

    this.websocketService.getMessages().subscribe(
      (data) => {
        console.log(data);

      const timestamp = new Date().toLocaleTimeString();
      this.chartLabels.push(timestamp);

      // Update chart data
      this.stateOfChargeData[0].data.push((data.stateOfCharge * 100).toFixed(2));
      this.stateOfChargeData[1].data.push((data.stateOfHealth).toFixed(2));
      this.currentSpeedData[0].data.push(data.batteryCurrent.toFixed(2));
      this.currentSpeedData[1].data.push(data.kmh.toFixed(2));
      this.temperatureData[0].data.push(data.batteryTemp.toFixed(2));
      this.temperatureData[1].data.push(data.ambientTemp.toFixed(2));
      this.voltageData[0].data.push(data.batteryVoltage.toFixed(2));
      this.distanceData[0].data.push(data.distance.toFixed(2));

      this.curentVoltage = data.batteryVoltage.toFixed(2)
      this.currentSpeed = data.kmh.toFixed(2)
      this.currentBatteryCurrent = data.batteryCurrent.toFixed(2)
      this.currentBatteryTemp = data.batteryTemp.toFixed(2)
      this.currentAmbientTemp = data.ambientTemp.toFixed(2)
      this.currentStateOfCharge = (data.stateOfCharge).toFixed(4)
      this.currentStateOfHealth = (data.stateOfHealth).toFixed(4)
      this.currentDistance = (data.distance).toFixed(2)
      this.currentLoad = (data.currentLoad).toFixed(2)

      this.stressDataInput.inputs[0].data = [Number(this.currentStateOfCharge), Number(this.currentStateOfHealth), Number(this.currentBatteryCurrent), Number(this.curentVoltage), Number(this.currentSpeed), Number(this.currentDistance), Number(this.currentBatteryTemp), Number(this.currentAmbientTemp), Number(this.currentLoad)];
      this.ttfDataInput.inputs[0].data = [Number(this.currentBatteryTemp),Number(this.currentBatteryCurrent),Number(this.curentVoltage),Number(this.currentStateOfCharge),Number(this.currentStateOfHealth)];

      if(data.batteryTemp.toFixed(2) > 55) {
        this.presentToast("<h2>High battery temperature!!</h2>", 3000);
        this.alerts.unshift({ sender: 'danger', text: 'High battery temperature: ' + data.batteryTemp.toFixed(2), date: new Date() });
      } else if (data.batteryTemp.toFixed(2) > 40) {
        this.presentToast("<h2>Increased battery temperature!</h2>", 3000);
        this.alerts.unshift({ sender: 'warning', text: 'Increased battery temperature: '+ data.batteryTemp.toFixed(2), date: new Date() });
      }

      // Keep only the latest 10 data points
      if (this.chartLabels.length > 25) {
        this.chartLabels.shift();
        this.stateOfChargeData[0].data.shift();
        this.stateOfChargeData[1].data.shift();
        this.currentSpeedData[0].data.shift();
        this.currentSpeedData[1].data.shift();
        this.temperatureData[0].data.shift();
        this.temperatureData[1].data.shift();
        this.voltageData[0].data.shift();
        this.distanceData[0].data.shift();
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
