import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {}
