import { Routes } from '@angular/router';

import { StatisticsComponent } from '../in-out/statistics/statistics.component';
import { InOutComponent } from '../in-out/in-out.component';
import { DetailComponent } from '../in-out/detail/detail.component';

export const dashboardRoutes: Routes = [
  { path: '', component:  StatisticsComponent},
  { path: 'in-out', component: InOutComponent },
  { path: 'details', component: DetailComponent },
  { path: '**', redirectTo: '' },
];
