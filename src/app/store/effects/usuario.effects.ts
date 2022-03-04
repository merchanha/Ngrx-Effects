import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { UsuarioService } from "src/app/services/usuario.service";

import * as usuariosActions from "../actions/usuarios.actions";
import * as userActions from "../actions/usuario.actions"



@Injectable()
export class UsuarioEffect {
    constructor(
        private actions$: Actions,
        private usuariosServices: UsuarioService
    ) { }

    cargarUsuario$ = createEffect(
        () => this.actions$.pipe(
            ofType(userActions.cargarUsuario),
            mergeMap(
                (action) => this.usuariosServices.gerUserById(action.id)
                    .pipe(
                        map(user => userActions.cargarUsuarioSuccess({ usuario: user })),
                        catchError(err=> of(userActions.cargarUsuarioError({payload:err})))
                    )
            )
        )

    )

}