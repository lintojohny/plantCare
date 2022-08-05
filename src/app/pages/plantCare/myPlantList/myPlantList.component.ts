import { Component, Injector, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Plants } from '../shared/plants.model';
import { PlantCareService } from '../shared/plantCare.service';
import { WateringFrequency } from './../shared/wateringFrequency.model';
import { AddPlantComponent } from './../addPlant/addPlant.component';

@Component({
  selector: 'app-plant-list',
  templateUrl: './myPlantList.component.html',
  styleUrls: ['./myPlantList.component.scss'],
})
export class PlantListComponent
  extends BaseResourceListComponent<Plants>
  implements OnInit
{
  name: string | undefined;
  plantList: any[] = [];

  constructor(
    private injector: Injector,
    private plantCareService: PlantCareService
  ) {
    super(plantCareService);
  }

  ngOnInit(): void {
    this.filter();
    let test = this.injector.get(AddPlantComponent);
    console.log(test);
  }

  filter() {
    this.subscribeGeneral.add(
      this.plantCareService
        .getAllFilter(this.pageNumber, this.size, this.name)
        .subscribe((response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        })
    );
  }

  paginate(event: any) {
    this.subscribeGeneral.add(
      this.plantCareService
        .getAllFilter(event.page, event.rows, this.name)
        .subscribe((response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        })
    );
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }
}
