import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Course } from 'src/app/model/course';
import { openEditCourseDialog } from '../course-dialog/course-dialog.component';

@Component({
  selector: 'app-courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input() courses: Course[]
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editCourse(course: Course){
    openEditCourseDialog(this.dialog, course)
    .pipe(filter(val=>!!val))
    .subscribe(console.log)
  }

}
