import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Plants extends BaseResourceModel {
  constructor(
    public wateringFrequency?: string,
    public lastWateredDate?: any,
    public plantName?: string,
    public plantPetName?: string,
    public plantTypeId?: string,
    public wateringFrequencyId?: string
  ) {
    super();
  }

  static fromJson(jsonData: any): Plants {
    return Object.assign(new Plants(), jsonData);
  }
}
