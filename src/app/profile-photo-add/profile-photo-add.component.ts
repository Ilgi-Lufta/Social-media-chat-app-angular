import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { userService } from '../homepage/user-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-photo-add',
  templateUrl: './profile-photo-add.component.html',
  styleUrls: ['./profile-photo-add.component.css']
})
export class ProfilePhotoAddComponent {
  myForm!: FormGroup;
  fileToUpload!:File;

  id!:string;
  
  constructor(private userService1:userService,private router :Router,private route:ActivatedRoute){}


  ngOnInit(): void {
    this.myForm = new FormGroup({
      description: new FormControl(null),
      file: new FormControl(null),})
      this.route.params
      .subscribe(params => {
        this.id=params['id'];
      })


    };
  
  onFileSelected(event:any){
    const file:File = event.target.files[0];

    if (file) {


      this.fileToUpload = file;
    }}

  onSubmit(form: FormGroup) {
    const sampleJson: {Description:string} = { Description:form.value.description}
   debugger
    const formData: FormData = new FormData();
    formData.append('File',this.fileToUpload, this.fileToUpload.name);
     formData.append('Description',form.value.description);

this.userService1.PostAdd(formData).subscribe(data => {
debugger


this.router.navigate(['homepage/',this.id ])
}, error => {
  debugger
console.log(error)
}
)

  }

}
