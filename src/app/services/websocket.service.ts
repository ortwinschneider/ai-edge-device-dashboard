import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  private socket$: WebSocketSubject<any>;
  private messagesSubject = new Subject<any>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    console.debug('new WebsocketService()');
  }

  public connect(): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
    }
  }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: 'ws://websocket-battery-simulation.apps.ocp4.rhlab.de/battery/metrics/'
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
