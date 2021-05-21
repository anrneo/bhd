import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private apiUrl = 'http://simple-api.herokuapp.com/api/v1/';  // URL to web api

  constructor(private http: HttpClient) { }
  
  getComments() {
    return this.http.get(`${this.apiUrl}comments`)
  }

  getComment(id) {
    return this.http.get(`${this.apiUrl}comments/${id}`)
  }

  updateComment(id, data) {
    return this.http.post(`${this.apiUrl}comments/${id}/update`,data)
  }

  addComment(id, data) {
    return this.http.post(`${this.apiUrl}comments`,data)
  }

}
