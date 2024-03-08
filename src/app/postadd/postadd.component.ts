import { Component } from '@angular/core';
import { userService } from '../homepage/user-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-postadd',
  templateUrl: './postadd.component.html',
  styleUrls: ['./postadd.component.css']
})
export class PostaddComponent {
  fileToUpload!:File;
  id!:string;
  
  constructor(private userService1:userService,private router :Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.route.params
    .subscribe(params => {
      this.id=params['id'];
    })
    
  }

  onFileSelected(event:any){
        const file:File = event.target.files[0];
        if (file) {
          this.fileToUpload = file;
     }}
     UploadFile(){
      debugger
         const formData: FormData = new FormData();
            formData.append('file',this.fileToUpload, this.fileToUpload.name);
    
      this.userService1.ProfileImage(formData).subscribe(data => {
        debugger
        this.router.navigate(['homepage/',this.id ])
      }, error => {
        console.log(error)
      }
      )
     }


}
