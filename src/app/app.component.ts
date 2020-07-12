import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private url;
  title = 'AngularApp';
  @Inject(DOCUMENT) document: any;

  ngOnInit(): void {
    this.url = document.location.href + 'api/';
    if (!environment.production) {
      environment.apiUrl = this.url;
    }
  }
}
