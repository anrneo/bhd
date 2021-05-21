import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../comments.service'

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: any
  total: any
  init: any
  pags: any
  constructor(private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.commentsService.getComments()
    .subscribe(data=>{
      
      this.init = data
      let pag = Math.floor(this.init.length/15)
      let array = []
      for (let i = 0; i < pag; i++) {
        array.push(i+1)
        
      }
      this.pags = array
      console.log(this.pags);
      
      this.comments = data
      this.total = this.comments.length
      this.comments = this.comments.slice(0,15)
      this.comments.sort((a, b) => (a.id > b.id) ? 1 : -1)

      
    })
  }

  paginate(id){
    console.log(id);
    let dataPag = this.init
    this.comments = dataPag.slice(id-1,15)
  }

}
