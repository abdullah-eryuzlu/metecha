import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatDialogModule,
    MatProgressSpinnerModule, MatTableModule,
    MatPaginatorModule,
    MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [
      CommonModule,
    MatButtonModule,
    MatIconModule,
      MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
      MatPaginatorModule,
      MatDialogModule,
      MatGridListModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
      MatPaginatorModule,
    MatTabsModule,
    MatCardModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
      MatTableModule,
      MatDialogModule,
      MatGridListModule
  ]
})
export class MaterialModule {}
