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
  MatGridListModule,
  MatTabsModule,
  MatCheckboxModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatChipsModule,
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
  LayoutModule,
  MatGridListModule,
  MatTabsModule,
  MatCheckboxModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  TextFieldModule,
  MatRadioModule,
  MatSnackBarModule
];

@NgModule({
  declarations: [],
  imports: [material],
  exports: [material]
})
export class AngularMaterialModule {}
