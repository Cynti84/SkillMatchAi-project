import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; // ✅ this is the new way in v5+
 

@Component({
  selector: 'app-ai-accuracy',
  imports: [CommonModule, BaseChartDirective, FormsModule],
  standalone: true,
  templateUrl: './ai-accuracy.component.html',
  styleUrls: ['./ai-accuracy.component.scss'],
})
export class AiAccuracyComponent {
  // ✅ Line Chart: Accuracy Over Time
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        data: [75, 78, 80, 83, 87],
        label: 'Monthly Accuracy (%)',
        fill: true,
        tension: 0.4,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0,123,255,0.2)',
        pointBackgroundColor: '#007bff',
        pointBorderColor: '#fff',
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 10 },
        title: { display: true, text: 'Accuracy (%)' },
      },
      x: {
        title: { display: true, text: 'Month' },
      },
    },
  };

  public lineChartType: 'line' = 'line';

  // ✅ Bar Chart: Accuracy per Job Category
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Software Dev', 'Design', 'Marketing', 'HR', 'Finance'],
    datasets: [
      {
        data: [85, 78, 88, 72, 91],
        label: 'Accuracy (%)',
        backgroundColor: '#007bff',
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: { stepSize: 10 },
        title: { display: true, text: 'Accuracy (%)' },
      },
      x: {
        title: { display: true, text: 'Category' },
      },
    },
  };

  public barChartType: 'bar' = 'bar';
}
