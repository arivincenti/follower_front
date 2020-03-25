import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
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
  MatSnackBarModule
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
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
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
