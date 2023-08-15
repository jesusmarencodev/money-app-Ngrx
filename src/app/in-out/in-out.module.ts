import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { OrderInOutPipe } from '../pipes/order-in-out.pipe';
import { DetailComponent } from './detail/detail.component';
import { InOutComponent } from './in-out.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import * as inOut from './in-out.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    InOutComponent,
    StatisticsComponent,
    DetailComponent,
    OrderInOutPipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('inOut', inOut.inOutReducer), 
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutesModule,
  ],
})
export class InOutModule {}
