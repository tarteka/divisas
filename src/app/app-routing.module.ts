import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConversorComponent } from './conversor/conversor.component';
import { EvolucionComponent } from './evolucion/evolucion.component';
import { AboutComponent } from './about/about.component';
import { VisitasComponent } from './libroVisitas/visitas/visitas.component';
import { NuevavisitaComponent } from './libroVisitas/nuevavisita/nuevavisita.component';
import { EditarVisitaComponent } from './libroVisitas/editar-visita/editar-visita.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'conversor', component: ConversorComponent },
  { path: 'evolucion', component: EvolucionComponent },
  { path: 'about', component: AboutComponent},
  { path: 'visitas', component: VisitasComponent},
  { path: 'visitas/nueva', component: NuevavisitaComponent},
  { path: 'visitas/:id', component: EditarVisitaComponent},
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
