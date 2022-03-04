import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import { cargarUsuario, cargarUsuarioError, cargarUsuarioSuccess } from '../actions';

export interface UsuarioState {
    id: string,

    user: Usuario,
    loaded: boolean,
    loading: boolean,
    error: any

}

export const userInitialState: UsuarioState = {
    id: null,

    user:null ,
    loaded: false,
    loading: false,
    error: false
}

const _userReducer = createReducer(userInitialState,

    on(cargarUsuario, (state, {id}) => ({ 
        ...state, 
        loading: true,
        id: id })),

    on(cargarUsuarioSuccess, (state, { usuario }) => ({
        ...state,
        loading: false,
        loaded: true,
        user: {...usuario}
    })),
    on(cargarUsuarioError, (state, { payload }) => ({
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

export function userReducer(state, action) {
    return _userReducer(state, action);
}