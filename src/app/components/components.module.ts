import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';

@NgModule({
  declarations: [IncrementadorComponent, DonaComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [IncrementadorComponent, DonaComponent],
})
export class ComponentsModule {}
