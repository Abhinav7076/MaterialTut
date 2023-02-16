import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-course-step-a',
  templateUrl: './create-course-step-a.component.html',
  styleUrls: ['./create-course-step-a.component.css']
})
export class CreateCourseStepAComponent implements OnInit {

  form = this.fb.group({
    title: ['',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    releasedAt: [new Date(1990,0,1), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: ['SAMPLE_TEXT', [Validators.required, Validators.minLength(3)]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get courseTitle(){
    return this.form.controls['title']
  }

}
