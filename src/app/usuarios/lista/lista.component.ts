import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { cargarUsuarios } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  loading: boolean= false
  error: any

  usuarios: Usuario[]= []

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('usuarios').subscribe(({users, loading, error})=>{
      this.usuarios = users;
      this.loading = loading;
      this.error = error
    })

    this.store.dispatch(cargarUsuarios())


    // this.usuariosService.gerUser()
    // .subscribe( data =>{
    //   console.log(data);
    //   this.usuarios = data
    // })
  }

}
