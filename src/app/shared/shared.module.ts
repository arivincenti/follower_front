import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FilterComponent } from './filter/filter.component';
import { StateFilterCounterPipe } from '../pipes/filter/state-filter-counter.pipe';
import { AreasPaginatorPipe } from '../pipes/areas/areas-paginator.pipe';
import { ImagePipe } from '../pipes/image/image.pipe';
import { MemberPaginatorPipe } from '../pipes/members/member-paginator.pipe';


@NgModule({
  declarations: [
    FooterComponent,
    FilterComponent,
    StateFilterCounterPipe,
    AreasPaginatorPipe,
    MemberPaginatorPipe,
    ImagePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  exports: [
    FooterComponent,
    FilterComponent,
    AreasPaginatorPipe,
    MemberPaginatorPipe,
    ImagePipe
  ]
})
export class SharedModule { }
