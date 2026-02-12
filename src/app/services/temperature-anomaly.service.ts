import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class TemperatureAnomalyService {

    constructor(public http: HttpClient, private configService: ConfigService) {
    }

    enableTemperatureAnomaly(batteryId: number) {
        return this.http.get<any[]>(this.configService.BATTERY_SIMULATION_API_ENDPOINT+'simulator/enableBatteryTempAnomaly/' + batteryId);
    }

    disableTemperatureAnomaly(batteryId: number) {
        return this.http.get<any[]>(this.configService.BATTERY_SIMULATION_API_ENDPOINT+'simulator/disableBatteryTempAnomaly/' + batteryId);
    }

}
