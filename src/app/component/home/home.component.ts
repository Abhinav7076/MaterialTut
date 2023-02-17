import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, map, tap, catchError, throwError, first, take, pipe } from 'rxjs';
import { Course } from 'src/app/model/course';
import { CoursesService } from 'src/app/services/courses.service';
import { of } from 'rxjs';
import { Lesson } from 'src/app/model/lesson';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    beginnerCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    currentBeginnerCourses: Observable<Course[]>;

    courses: Observable<Course[]>
    @ViewChild(MatPaginator) paginator: MatPaginator

    constructor(private coursesService: CoursesService) {

    }

    ngOnInit() {

        const courses$ = this.coursesService.findAllCourses();
        this.courses = courses$

        this.beginnerCourses$ = courses$.pipe(
          map(courses => courses.filter(course => course.category === 'BEGINNER') )
        );

        this.currentBeginnerCourses = this.beginnerCourses$.pipe(
          map(courses=>courses.slice(0,3))
        )

        this.advancedCourses$ = courses$.pipe(
            map(courses => courses.filter(course => course.category === 'ADVANCED') )
        );

        console.log(this.beginnerCourses$.subscribe(data=>console.log(data.length)))

    }

    // {previousPageIndex: 0, pageIndex: 1, pageSize: 3, length: 13}
    ngAfterViewInit(): void {
      this.paginator.page.subscribe(data=>{
      this.currentBeginnerCourses = this.beginnerCourses$.pipe(
        map(courses => courses.slice(data.pageIndex*data.pageSize, 
          data.pageIndex*data.pageSize+data.pageSize) )
      )
      })
    }

}
