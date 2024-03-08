import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,AbstractControl,ValidationErrors,ValidatorFn, FormArray } from '@angular/forms';

@Component({
  selector: 'app-my-first-reactive-form',
  templateUrl: './my-first-reactive-form.component.html',
  styleUrls: ['./my-first-reactive-form.component.css']
})
export class MyFirstReactiveFormComponent implements OnInit {
  myForm!: FormGroup;
  pStatus: string[] = ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.myForm = new FormGroup({
      name: new FormControl(null,[Validators.required,this.MyCustomValidator()]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      projectStatus: new FormControl(this.pStatus[0]),
      lessons : new FormArray([])
    });
  }
  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log('Name', form.value.name);
    console.log('Email', form.value.email);
    console.log('projectStatus', form.value.projectStatus);
    console.log(form); // true or false


  }

 MyCustomValidator(): ValidatorFn {
  return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (value !== "Test") {
          return null;
      }
      return  {wrongUsernme:true};
  }
}

addLesson(){
let control = new FormGroup({
  title: new FormControl(null,[Validators.required]),
  level: new FormControl(null,[Validators.required]),
 
});
// let control = new FormControl(null,Validators.required)
//(<FormArray> this.myForm.get('lessons')).push(control)
this.lessons.push(control);
}

get lessons() {
  return this.myForm.controls["lessons"] as FormArray;
}

get controls() {
  return (this.myForm.get('lessons') as FormArray).controls;
  this.myForm.controls['name'].invalid
}

removeLesson(index:number,lession :AbstractControl<any, any>){

  this.lessons.removeAt(index);
  console.log(lession)
}
}


