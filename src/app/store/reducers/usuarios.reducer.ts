import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuarios, cargarUsuariosError, cargarUsuariosSuccess } from '../actions';

export interface UsuariosState {

    users: Usuario[],
    loaded: boolean,
    loading: boolean,
    error: any

}

export const usuarioInitialState: UsuariosState = {

    users: [],
    loaded: false,
    loading: false,
    error: false
}

const _usuarioReducer = createReducer(usuarioInitialState,

    on(cargarUsuarios, state => ({ ...state, loading: true })),
    on(cargarUsuariosSuccess, (state, { usuarios }) => ({
        ...state,
        loading: false,
        loaded: true,
        users: [...usuarios]
    })),
    on(cargarUsuariosError, (state, { payload }) => ({
        ...state, 
        loading: false,
        loaded: false,
        error: {
            url: payload.url,
            name: payload.name,
            message: payload.message
        }
       
    })),

);

export function usuarioReducer(state, action) {
    return _usuarioReducer(state, action);
}