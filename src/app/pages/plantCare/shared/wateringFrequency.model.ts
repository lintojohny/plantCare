import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class WateringFrequency extends BaseResourceModel {
  constructor(public type?: string) {
    super();
  }

  static fromJson(jsonData: any): WateringFrequency {
    return Object.assign(new WateringFrequency(), jsonData);
  }
}
