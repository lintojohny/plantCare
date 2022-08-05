import {
  OnInit,
  AfterContentChecked,
  Injector,
  Directive,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';

import { switchMap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Subscriber } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Plants } from './../../../pages/plantCare/shared/plants.model';

@Directive()
export abstract class BaseResourceFormComponent<T extends Plants>
  implements OnInit, AfterContentChecked, OnDestroy
{
  currentAction: string = '';
  resourceForm: FormGroup;
  pageTitle: string = '';
  serverErrorMessages: string[] = [];
  submittingForm: boolean = false;
  subscribeGeneral: Subscriber<any> = new Subscriber();

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
    this.resourceForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;
    if (this.currentAction == 'new') this.createResource();
    else this.updateResource();
  }

  // PRIVATE METHODS

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path == 'new') this.currentAction = 'new';
    else this.currentAction = 'edit';
  }

  protected loadResource() {
    if (this.currentAction == 'edit') {
      this.route.paramMap
        .pipe(
          switchMap((params: any) =>
            this.resourceService.getById(+params.get('id'))
          )
        )
        .subscribe(
          (resource: any) => {
            this.resource = resource;
            resource.lastWateredDate = resource.lastWateredDate.split(' ')[0];

            this.resourceForm.patchValue({
              id: resource.id,
              plantTypeId: resource.plantTypes.id,
              wateringFrequencyId: resource.wateringFrequency.id,
              lastWateredDate: resource.lastWateredDate,
              plantPetName: resource.plantPetName,
            }); // binds loaded resource data to resourceForm
          },
          (error: any) => alert('Error Occured')
        );
    }
  }

  protected setPageTitle() {
    if (this.currentAction == 'new') this.pageTitle = this.creationPageTitle();
    else {
      this.pageTitle = this.editionPageTitle();
    }
  }

  protected creationPageTitle(): string {
    return 'New';
  }

  protected editionPageTitle(): string {
    return 'Edit';
  }

  protected createResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);

    this.subscribeGeneral.add(
      this.resourceService.create(resource).subscribe(
        (resource) => this.actionsForSuccess(resource),
        (error) => this.actionsForError(error)
      )
    );
  }

  protected updateResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.subscribeGeneral.add(
      this.resourceService.update(resource).subscribe(
        (resource) => this.actionsForSuccess(resource),
        (error) => this.actionsForError(error)
      )
    );
  }

  protected actionsForSuccess(resource: T) {
    swal.fire(`Success`, `Request processed successfully!`, 'success');
    // const baseComponentPath: string = '/';
    // redirect/reload component page
    this.router.navigateByUrl('', { skipLocationChange: true });
    // .then(() => this.router.navigate(['new', resource.id, 'edit']));
  }

  protected actionsForError(error: any) {
    swal.fire(`Error`, `There was an error processing your request!`, 'error');

    this.submittingForm = false;

    if (error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else this.serverErrorMessages = ['Something went wrong.'];
  }

  protected abstract buildResourceForm(): void;

  ngOnDestroy() {
    this.subscribeGeneral.unsubscribe();
  }
}
