import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Plants } from '../shared/plants.model';
import { PlantsMaster } from '../shared/plantsMaster.model';
import { PlantCareService } from '../shared/plantCare.service';
import { WateringFrequency } from '../shared/wateringFrequency.model';

@Component({
  selector: 'app-add-plant',
  templateUrl: './addPlant.component.html',
  styleUrls: ['./addPlant.component.scss'],
})
export class AddPlantComponent
  extends BaseResourceFormComponent<Plants>
  implements OnInit, OnDestroy
{
  plantsMasterData: PlantsMaster[] = [];
  wateringFreqencyList: WateringFrequency[] = [];

  constructor(
    protected plantCareService: PlantCareService,
    protected injector: Injector
  ) {
    super(injector, new Plants(), plantCareService, Plants.fromJson);
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      plantTypeId: [null, [Validators.required]],
      wateringFrequencyId: [null, [Validators.required]],
      lastWateredDate: [null, [Validators.required]],
      plantPetName: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.subscribeGeneral.add(
      this.plantCareService.getPlantsMasterData().subscribe((response) => {
        this.plantsMasterData = response;
      })
    );
    this.subscribeGeneral.add(
      this.plantCareService.getWateringFrequency().subscribe((response) => {
        this.wateringFreqencyList = response;
      })
    );
    let test = this.injector.get(AddPlantComponent);
    console.log(test);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
  maxWateringDate() {
    return new Date().toISOString().split('T')[0];
  }

  minWateringDate() {
    let date = new Date();
    // Set it to one month ago
    return new Date(date.setMonth(date.getMonth() - 1))
      .toISOString()
      .split('T')[0];
  }

  protected creationPageTitle(): string {
    return 'Add New Plant';
  }

  protected editionPageTitle(): string {
    const plantName = this.resource.plantName || '';
    return 'Editing Plant Details: ' + plantName;
  }
}
