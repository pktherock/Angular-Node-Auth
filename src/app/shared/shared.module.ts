import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContainerComponent } from './components/container/container.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../modules/material/material.module';

@NgModule({
  declarations: [NotFoundComponent, ContainerComponent, CardComponent],
  imports: [CommonModule, MaterialModule],
  exports: [NotFoundComponent, ContainerComponent, CardComponent],
})
export class SharedModule {}
