import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  constructor() { }

  ngOnInit() {
    // this.subs.push(interval(1000).subscribe(count => {
    //   console.log(count);
    // }));

    const customIntervalObservable = new Observable<number>(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('The count has exceeded 3!'));
        }
        count++;
      }, 1000);
    })

    this.subs.push(customIntervalObservable.pipe(filter((data: number) => {
      return data > 0
    }), map((data: number) => {
          return `Round: ${data + 1}`;
      }))
      .subscribe(data => {
          console.log(data);
        }, error => {
            //alert(error.message);
        }, () => {
          console.log('completed')
        }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
