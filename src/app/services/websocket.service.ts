import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  private socket$: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  constructor(private configService: ConfigService) {
    console.debug('new WebsocketService()');
  }

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
    }
  }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: this.configService.BATTERY_METRICS_WS_ENDPOINT
      //binaryType: 'arraybuffer'
    }

    );
  }

  getMessages(): Observable<any> {
    return this.socket$.asObservable();
  }

  sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message);
    } else {
      console.error('WebSocket connection is not established.');
    }
  }

  close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
