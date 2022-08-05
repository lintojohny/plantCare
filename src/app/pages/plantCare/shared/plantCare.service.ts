import { Injectable, Injector } from '@angular/core';
import { Plants } from './plants.model';

import { Observable } from 'rxjs';
import { UtilService } from 'src/app/shared/services/util.service';
import { BaseResourceService } from 'src/app/shared/services/base-resource.service';
import { PlantsMaster } from './plantsMaster.model';
import { WateringFrequency } from './wateringFrequency.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlantCareService extends BaseResourceService<Plants> {
  constructor(protected injector: Injector) {
    super(`${UtilService.BASE_URL}`, injector, Plants.fromJson);
  }

  getAllFilter(page: number, size: number, name?: string): Observable<any> {
    const url = `${this.apiPath}`;

    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('size', size.toString());
    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<any>(url, {
      params: params,
      headers: this.headers,
    });
  }

  getPlantsMasterData(): Observable<PlantsMaster[]> {
    const url = `${UtilService.BASE_URL}/types`;

    return this.http.get<PlantsMaster[]>(url, { headers: this.headers });
  }

  getWateringFrequency(): Observable<WateringFrequency[]> {
    const url = `${UtilService.BASE_URL}/watering_frequency`;

    return this.http.get<WateringFrequency[]>(url, { headers: this.headers });
  }
}
