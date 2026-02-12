import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from './services/config.service';

import {
  provideCharts,
  withDefaultRegisterables,
  } from 'ng2-charts';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) =>
          () => configService.loadConfigurationData(),
      deps: [ConfigService],
      multi: true
    },
    [ provideCharts(withDefaultRegisterables()), ]
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
