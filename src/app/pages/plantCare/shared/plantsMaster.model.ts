import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class PlantsMaster extends BaseResourceModel {
  constructor(public name?: string, public species?: string) {
    super();
  }

  static fromJson(jsonData: any): PlantsMaster {
    return Object.assign(new PlantsMaster(), jsonData);
  }
}
