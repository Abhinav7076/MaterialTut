import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  description: string

  form = this.fb.group({
    description: [this.course.description, Validators.required],
    category: [this.course.category, Validators.required],
    releasedAt: [new Date(), Validators.required],
    longDescription: [this.course.longDescription, Validators.required]
  })

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) private course: Course, private dialogRef: MatDialogRef<CourseDialogComponent>) { }

  ngOnInit(): void {
    this.description = this.course.description
  }

  close(){
    this.dialogRef.close()
  }

  save(){
    this.dialogRef.close(this.form.value)
  }

}

export function openEditCourseDialog(dialog: MatDialog, course: Course){

  const config = new MatDialogConfig()

  config.disableClose = true // so that dialog won't close when user clicks esc
  config.autoFocus = true // to focus on input

  config.data = {
    ...course
  }

  const dialogRef = dialog.open(CourseDialogComponent, config)

  return dialogRef.afterClosed() //to emit the value from the dialog

}
