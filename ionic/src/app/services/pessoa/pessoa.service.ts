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
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    url: string = SERVER_URL + 'pessoa';
    pessoa: any[];

    constructor(
        public http: HttpClient
    ) { }

    getPessoasMesa(mesa_id: any): Observable<any> {
        return this.http.get(SERVER_URL + 'pessoasMesa/' + mesa_id, this.httpHeaders).pipe(map(res => res));
    }

    getPessoasPedidos(mesa_id: any): Observable<any> {
        return this.http.get(SERVER_URL + 'pessoasMesaComPedidos/' + mesa_id, this.httpHeaders).pipe(map(res => res));
    }

    getPessoa(id: number): Observable<any> {
        return this.http.get(this.url + "/" + id, this.httpHeaders).pipe(map(res => res));
    }

    deletePessoa(id: number): Observable<any> {
        return this.http.delete(this.url + "/" + id);
    }

    createPessoa(nome: string, id: number, pago: boolean): Observable<any> {
        return this.http.post(this.url, {
            'nome': nome,
            'mesa_id': id,
            'pago': pago
        }, this.httpHeaders).pipe(map(res => res));
    }

    createPessoas(pessoas: any, mesa_id: number, pago: boolean):Observable<any> {
        return this.http.post(SERVER_URL + 'pessoas', {
            'pessoas': pessoas,
            'mesa_id': mesa_id,
            'pago': pago
        }, this.httpHeaders).pipe(map(res => res));
    }

    updatePessoaNome(nome: string, id: number): Observable<any> {
        return this.http.put(this.url + "/" + id, {
            'nome': nome,
            'pago': false
        }, this.httpHeaders).pipe(map(res => res));
    }

    updatePessoaPag(pago: boolean, id: number): Observable<any> {
        return this.http.put(this.url + "/" + id, {
            'pago': pago
        }, this.httpHeaders).pipe(map(res => res));
    }

}
