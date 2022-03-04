import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";

import * as usuariosActions from "../actions/usuarios.actions";



@Injectable()
export class UsuariosEffect {
    constructor(
        private actions$: Actions,
        private usuariosServices: UsuarioService
    ) { }

    cargarUsuarios$ = createEffect(
        () => this.actions$.pipe(
            ofType(usuariosActions.cargarUsuarios),
            mergeMap(
                () => this.usuariosServices.gerUser()
                    .pipe(
                        map(users => usuariosActions.cargarUsuariosSuccess({ usuarios: users })),
                        catchError(err=> of(usuariosActions.cargarUsuariosError({payload:err})))
                    )
            )
        )

    )

}