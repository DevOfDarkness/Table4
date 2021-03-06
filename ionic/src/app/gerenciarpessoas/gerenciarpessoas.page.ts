import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../services/pessoa/pessoa.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-gerenciarpessoas',
  templateUrl: './gerenciarpessoas.page.html',
  styleUrls: ['./gerenciarpessoas.page.scss'],
})
export class GerenciarpessoasPage implements OnInit {

  gerenciarPessoa: FormGroup;
  pessoas;


  constructor(
    public pessoaService: PessoaService,
    private storage: Storage,
    public formBuilder: FormBuilder) {
      this.gerenciarPessoa = this.formBuilder.group({
        nome: [null, [Validators.required]],
      });
    }

  createPessoa(form){
    console.log(form.value);
    //this.service.createPessoa(form.value.nome).subscribe( (res) => { console.log(res); }, (error) => { console.log(error); })
  }

  getPessoa(id):void{
    console.log("Resgatando pessoas no Back");
    this.storage.get("mesa_id").then( (mesa_id) => {
      this.pessoaService.getPessoasMesa(mesa_id).subscribe( (res) => {
        this.pessoas = res;
        console.log(res);
      });
    });
  }

  deletePessoa(id) {
    this.pessoaService.deletePessoa(id).subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit(){ }

  ionViewWillEnter() {
     this.storage.get("mesa_id").then( (mesa_id) => {
      this.pessoaService.getPessoasMesa(mesa_id).subscribe( (res) => {
        console.log(res);
        this.pessoas = res;
      },
      (error) => {
          console.log(error);
      });
    });
  }

}
