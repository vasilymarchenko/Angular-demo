import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <pm-products></pm-products>
    </div>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
}
