import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, SERVER_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private httpHeaders = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  url:string = SERVER_URL + 'pessoa';
  pessoa: any[];
  
  constructor(
    public http: HttpClient
  ) { }

  getPessoas(mesa_id: number):Observable<any>{
    return this.http.get(SERVER_URL + 'pessoasMesa/' + mesa_id, this.httpHeaders).pipe(map(res => res));
  }

  getPessoa(id: number):Observable<any>{
    return this.http.get(this.url + "/" + id, this.httpHeaders).pipe(map(res => res));
  }

  deletePessoa(id: number):Observable<any>{
    return this.http.delete(this.url + "/" + id);
  }

  createPessoa(nome: string, id: number): Observable<any> {
    return this.http.post(this.url, {
      'nome': nome,
      'mesa_id': id,
    }, this.httpHeaders).pipe(map(res => res));
  }


}
