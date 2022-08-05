import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPlantComponent } from './addPlant/addPlant.component';
import { PlantListComponent } from './myPlantList/myPlantList.component';

const routes: Routes = [
  { path: '', component: PlantListComponent },
  { path: 'new', component: AddPlantComponent },
  { path: ':id/edit', component: AddPlantComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantCareRoutingModule {}
