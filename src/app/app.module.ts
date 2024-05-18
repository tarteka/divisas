import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConversorComponent } from './conversor/conversor.component';
import { EvolucionComponent } from './evolucion/evolucion.component';

import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { VisitasComponent } from './libroVisitas/visitas/visitas.component';
import { VisitaComponent } from './libroVisitas/visita/visita.component';
import { NuevavisitaComponent } from './libroVisitas/nuevavisita/nuevavisita.component';
import { EditarVisitaComponent } from './libroVisitas/editar-visita/editar-visita.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, ConversorComponent, EvolucionComponent, AboutComponent, VisitasComponent, VisitaComponent, NuevavisitaComponent, EditarVisitaComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
