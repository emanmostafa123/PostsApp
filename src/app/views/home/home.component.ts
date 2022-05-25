import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/services/data';
import { FormBuilder  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  data : Data[] = []
  constructor(
    public authService: AuthService,
    private dataService : DataService,
    private builder:FormBuilder,
    private router : Router
  ) {

   
   }

   addPostForm = this.builder.group({
    title :[''],
    body : ['']
  })


  addposts(post:any){
    this.dataService.addposts(post).subscribe({
      next:()=>{
        console.log(post)
        this.data.splice(0,0,post)
        this.router.navigateByUrl('home')
      },
      error:(httpError:any)=>{
        console.log(httpError)
      }
    })
  }


   getPosts(){
    this.dataService.getData().subscribe({
      next:(res:any)=>{
        this.data=res
      },
      error:(httpError:any)=>{
        console.log(httpError)
      }
    })
  }

  deletePost(data:any,i:number){
    this.dataService.deletePost(data).subscribe({

      next:()=>{
        this.data.splice(i,1)
      },
      error:(httpError:any)=>{
        console.log(httpError)
      }
    })

  }

  ngOnInit(): void {
    this.getPosts()
  }

  

}
