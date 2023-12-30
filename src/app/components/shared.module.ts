import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BigInputComponent } from './big-input/big-input.component';
import { MaterialsModule } from './materials/materials.module';

@NgModule({
  declarations: [BigInputComponent],
  imports: [CommonModule, MatButtonModule, MaterialsModule],
  exports: [BigInputComponent, MaterialsModule],
})
export class SharedModule {}
