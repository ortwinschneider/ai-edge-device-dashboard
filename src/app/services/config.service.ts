import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ConfigService {

  BATTERY_METRICS_WS_ENDPOINT: any;
  OPEN_AI_API_KEY: any;
  STRESS_DETECTION_AI_API_ENDPOINT: any;
  TIME_TO_FAILURE_AI_API_ENDPOINT: any;
  BATTERY_SIMULATION_API_ENDPOINT: any;
  AUTO_INFERENCE_INTERVAL_MS: any;

    constructor(public http: HttpClient) {}

    async loadConfigurationData() {
        console.debug('loadConfigurationData');

        const data = await this.http.get<any>('/assets/config.json').toPromise();

        console.debug('App config loaded: ' + JSON.stringify(data));

        this.BATTERY_METRICS_WS_ENDPOINT = data.BATTERY_METRICS_WS_ENDPOINT;
        this.OPEN_AI_API_KEY = data.OPEN_AI_API_KEY;
        this.STRESS_DETECTION_AI_API_ENDPOINT = data.STRESS_DETECTION_AI_API_ENDPOINT;
        this.TIME_TO_FAILURE_AI_API_ENDPOINT = data.TIME_TO_FAILURE_AI_API_ENDPOINT;
        this.BATTERY_SIMULATION_API_ENDPOINT = data.BATTERY_SIMULATION_API_ENDPOINT;
        this.AUTO_INFERENCE_INTERVAL_MS = data.AUTO_INFERENCE_INTERVAL_MS;

    }

}
