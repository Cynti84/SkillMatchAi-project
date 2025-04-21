import { Component, OnInit } from '@angular/core';
// import { StateService } from '../state.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule],
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  // user: any;
  // constructor(private stateService: StateService) {}
  // ngOnInit(): void {}
}
