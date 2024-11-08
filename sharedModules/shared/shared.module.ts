import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../component/feature/search/search.component';
import { DeleteComponent } from 'src/app/component/feature/delete/delete.component';
@NgModule({
  declarations: [SearchComponent,DeleteComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SearchComponent  ,
    DeleteComponent
  ]
})
export class SharedModule { }
