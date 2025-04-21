import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ai-assistant',
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.scss'],
})
export class Ai_assistantComponent {
  messages = [
    {
      from: 'assistant',
      text: 'Hi! I\'m your AI Assistant. How can I help you today?'
    },
    
  ];

  userInput = '';

  sendMessage() {
    if (!this.userInput.trim()) return;
    this.messages.push({
      from: 'user',
      text: this.userInput
    });
    this.userInput = '';

    // Simulate AI response (replace with actual logic later)
    setTimeout(() => {
      this.messages.push({
        from: 'assistant',
        text: 'Searching our database...'
      });
    }, 1000);
    setTimeout(() => {
      this.messages.push({
        from: 'assistant',
        text: 'Please try again later.',
      });
    }, 2000);
    
  }
}
