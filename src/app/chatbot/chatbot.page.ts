import { Component,ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage {
  messages: { sender: string; text: string }[] = [];
  userInput = '';
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  constructor(private http: HttpClient, private configService: ConfigService) {}

  sendMessage() {
    if (this.userInput.trim()) {
      const userMessage = this.userInput.trim();
      this.messages.push({ sender: 'user', text: userMessage });
      this.userInput = '';

      setTimeout(() => {
        this.messages.push({ sender: 'bot', text: 'This is a static bot response.' });
        this.scrollToBottom();
      }, 1000);

      // Call ChatGPT backend
      this.http
        //.post('https://api.openai.com/v1/chat/completions', {
        .post('http://127.0.0.1:8000/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
        }, {
          headers: { 'Authorization': `Bearer ` + this.configService.OPEN_AI_API_KEY }
        })
        .subscribe((response: any) => {
          const botMessage = response.choices[0].message.content;
          this.messages.push({ sender: 'bot', text: botMessage });
          this.scrollToBottom();
        });
    }
  }

  clearMessages() {
    this.messages = []; // Reset the messages array
  }

  scrollToBottom() {
    setTimeout(() => {
      const container = this.chatContainer.nativeElement;
      container.scrollTop = container.scrollHeight;
    });
  }

}
