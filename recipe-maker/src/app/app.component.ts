import { Component } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipe-maker';
  loadedFeature = 'recipe';

  constructor() {
    setTheme('bs5');
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
