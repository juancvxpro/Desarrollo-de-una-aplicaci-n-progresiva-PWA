import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ListarComponent } from './components/listar/listar.component';

const routes: Routes = [
{path: '', redirectTo:'lista-obras',pathMatch:'full'}, 
{path: 'lista-obras', component:ListarComponent },
{path: 'crear-obras', component: AgregarComponent},
{path: 'editar-obras/:id', component: AgregarComponent},
{path: '**', redirectTo:'lista-obras',pathMatch:'full'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
