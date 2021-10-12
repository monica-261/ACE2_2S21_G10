import { AppNotfoundComponent } from '../app-notfound/app-notfound.component';
import { AppGuardGuard } from './app-guard.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreceComponent } from '../crece/crece.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/practica', pathMatch: 'full' },
  { path: '', component: AppNotfoundComponent, canActivate: [AppGuardGuard] },
  { path: 'practica', component: CreceComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
