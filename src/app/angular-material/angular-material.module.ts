import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatDatepickerModule,
  MatDividerModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTooltipModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatRadioModule,
  MatSnackBarModule,
  MatNativeDateModule
} from "@angular/material";
import { LayoutModule } from "@angular/cdk/layout";
import { TextFieldModule } from "@angular/cdk/text-field";

const material = [
  LayoutModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSidenavModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  TextFieldModule
];

@NgModule({
  declarations: [],
  imports: [material],
  exports: [material]
})
export class AngularMaterialModule {}
