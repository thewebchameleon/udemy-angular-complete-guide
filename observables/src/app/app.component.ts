import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  userActivated = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subs.push(this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

}
