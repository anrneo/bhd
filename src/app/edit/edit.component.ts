import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../comments.service'
import {Router} from "@angular/router"

declare var M

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  source:any = {}
  type:any = ''
  user:any = ''
  constructor(private route: ActivatedRoute, private commentsService: CommentsService, private router: Router) { }

  ngOnInit(): void {
    this.materialize()  
    let id = this.route.snapshot.params['id']
    if (id==0) {
      this.type = 'CREAR'
      this.user = 'Nuevo  Usuario'
      this.source = {content: "", email: "", name: "", website: ""}
    }else{
      this.type = 'ACTUALIZAR'
      this.user = 'Actualizar  Usuario'
      this.commentsService.getComment(id)
      .subscribe(data=>{
        this.source = data
      })
    }
   
    

  }


  onSubmit(){
    const pattern = new RegExp('^[A-Z]+$', 'i');
    if (!pattern.test(this.source.name)){
      M.toast({html: 'El campo nombre solo debe admitir letras!', classes: 'rounded'});
     return
    }else if(this.source.name.length > 35){
      M.toast({html: 'El campo nombre solo permite hasta 35 caracteres!', classes: 'rounded'});
      return
    }

    var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.source.email.match(EMAIL_REGEX)){
      M.toast({html: 'El Correo electrónico no es valido!', classes: 'rounded'});
     return
    }
    const regWeb = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if (!this.source.website.match(regWeb)){
      M.toast({html: 'La Url de la página web no es valida!', classes: 'rounded'});
     return
    }

    if(this.source.content.length > 100){
      M.toast({html: 'El campo Comentario  solo permite hasta 100 caracteres!', classes: 'rounded'});
      return
    }
    let id = this.route.snapshot.params['id'];
    if (id==0) {
      let post = {content: this.source.content, email: this.source.email, name: this.source.name, website: this.source.website}
      this.commentsService.addComment(id,post)
      .subscribe(data=>{
        this.router.navigate(['/home/comments'])
        M.toast({html: 'Creación de usuario exitosa!', classes: 'rounded teal'});
      })
    }else{
      let post = {content: this.source.content, email: this.source.email, name: this.source.name}
      this.commentsService.updateComment(id,post)
      .subscribe(data=>{
        this.router.navigate(['/home/comments'])
        M.toast({html: 'Actualización de usuario exitosa!', classes: 'rounded teal'});
      })
    }
    
  }

  materialize(){ 
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elems, Option);  
    });
  }

}
