import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantCareRoutingModule } from './plantCare-routing.module';
import { PlantListComponent } from './myPlantList/myPlantList.component';
import { AddPlantComponent } from './addPlant/addPlant.component';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PlantListComponent, AddPlantComponent, HighlightDirective],
  imports: [CommonModule, SharedModule, PlantCareRoutingModule],
})
export class PlantCareModule {}
