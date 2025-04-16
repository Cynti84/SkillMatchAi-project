import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-career-guidance',
  imports:[CommonModule],
  templateUrl: './career-guidance.component.html',
  styleUrls: ['./career-guidance.component.scss'],
})
export class CareerGuidanceComponent implements OnInit {
  recommendedRoles = [
    {
      title: 'Frontend Developer',
      level: 'Mid-level',
      skills: ['HTML', 'CSS', 'Angular', 'TypeScript'],
    },
    {
      title: 'UI/UX Designer',
      level: 'Entry-level',
      skills: ['Figma', 'Design Thinking', 'Prototyping'],
    },
  ];

  careerPath = [
    'Junior Developer',
    'Mid-level Developer',
    'Senior Developer',
    'Tech Lead',
  ];

  skillGap = [
    { skill: 'RxJS', required: true, hasSkill: false },
    { skill: 'Angular CLI', required: true, hasSkill: true },
    { skill: 'Unit Testing', required: true, hasSkill: false },
  ];

  trendingCareers = [
    'Data Analyst',
    'Cloud Engineer',
    'AI Prompt Engineer',
    'DevOps Engineer',
  ];

  resources = [
    { name: 'Angular Basics Course', link: 'https://angular.io/start' },
    { name: 'RxJS Docs', link: 'https://rxjs.dev' },
    { name: 'Frontend Mentor Challenges', link: 'https://frontendmentor.io' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
