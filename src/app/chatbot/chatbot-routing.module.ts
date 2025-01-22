import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { ChatbotPage } from './chatbot.page';

const routes: Routes = [
  {
    path: '',
    component: ChatbotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),HttpClientModule],
  exports: [RouterModule],
})
export class ChatbotPageRoutingModule {}
