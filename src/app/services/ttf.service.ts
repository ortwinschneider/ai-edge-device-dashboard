import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class TimeToFailureService {

    constructor(public http: HttpClient, private configService: ConfigService) {
    }

    predictTimeToFailure(payload: any) {
      console.dir(payload);
        return this.http.post<any>(this.configService.TIME_TO_FAILURE_AI_API_ENDPOINT+'v2/models/time-to-failure/infer', JSON.parse(payload));
    }

}
