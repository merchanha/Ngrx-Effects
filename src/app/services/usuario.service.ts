import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = 'https://reqres.in/api'

  constructor(private http: HttpClient) { }

  gerUser(){
    return this.http.get(`${this.url}/users?per_page=6`)
    .pipe(
      map ((resp: any)=>{
        return resp['data']
      })
    )
  }

  gerUserById(id: string){
    return this.http.get(`${this.url}/users/${id}`)
    .pipe(
      map ((resp: any)=>{
        return resp['data']
      })
    )
  }
}
