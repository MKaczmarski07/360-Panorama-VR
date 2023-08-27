import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BasicComponent } from './home/basic/basic.component';
import { VrComponent } from './home/vr/vr.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'basic', component: BasicComponent },
  { path: 'vr', component: VrComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
