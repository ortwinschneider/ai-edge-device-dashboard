import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.websocketService.connect();

    this.websocketService.getMessages().subscribe(
      (msg) => {
        console.log(msg);
      }, // Called whenever there is a message from the server.
      err => console.error(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );

  }

  ngOnDestroy(): void {
    this.websocketService.close();
  }
}
