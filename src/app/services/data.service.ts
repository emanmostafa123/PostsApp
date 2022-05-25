import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './data'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

   url = "https://jsonplaceholder.typicode.com/posts"
  getData(){
    return this.http.get(this.url)
  }

  addposts(posts:Data){
    return this.http.post(this.url,posts)
  }
  deletePost(id:any){
    return this.http.delete(this.url + '/'+id)
  }
  updatePost(id:any,data:Data){
    return this.http.patch(this.url + id , data)
  }
}
