import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class StressDetectionService {

    constructor(public http: HttpClient, private configService: ConfigService) {
    }

    batteryStressDetection(payload: any) {
        return this.http.post<any>(this.configService.STRESS_DETECTION_AI_API_ENDPOINT+'v2/models/stress-detection/infer', JSON.parse(payload));
    }

}
