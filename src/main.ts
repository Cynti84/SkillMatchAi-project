import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideCharts } from 'ng2-charts';

// 🧠 NEW: Chart.js parts
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

// ✅ Register needed parts
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
