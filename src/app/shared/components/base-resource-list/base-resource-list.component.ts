import { OnInit, Directive, OnDestroy } from '@angular/core';

import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import swal from 'sweetalert2';
import { Page } from '../../models/page.model';
import { Subscriber } from 'rxjs';

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel>
  implements OnInit, OnDestroy
{
  resources: T[] = [];
  size: number = 10;
  wordSearch: string = '';
  page: Page = {} as Page;
  pageNumber = 0;
  totalElementos = 0;
  subscribeGeneral: Subscriber<T> = new Subscriber();

  constructor(private resourceService: BaseResourceService<T>) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.subscribeGeneral.unsubscribe();
  }

  paginate(event: any) {
    this.subscribeGeneral.add(
      this.resourceService
        .getAllPage(event.page, event.rows)
        .subscribe((response) => {
          this.page = response;
          this.resources = this.page.content;
          this.totalElementos = this.page.totalElements;
        })
    );
  }

  async deleteResource(resource: T) {
    const confirm = await swal.fire({
      title: 'Delete',
      text: 'Do you want really delete the item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    });
    if (confirm?.isConfirmed) {
      this.resourceService.delete(resource?.id || 0).subscribe(
        () =>
          (this.resources = this.resources.filter((element) => {
            this.subscribeGeneral.add(
              this.resourceService
                .getAllPage(this.pageNumber, this.size)
                .subscribe((response) => {
                  this.page = response;
                  this.resources = this.page.content;
                  this.totalElementos = this.page.totalElements;
                })
            );
          })),
        () => swal.fire('Error', 'Error while deleting!', 'error')
      );
    }
  }
}
