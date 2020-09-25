import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.css']
})
export class SiderComponent implements OnInit {

  activeRoute: string = 'dashboard';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    switch(this.router.url) {
      case '/dashboard':
        this.activeRoute = 'dashboard';
      break;

      case '/contacts':
        this.activeRoute = 'contacts';
      break;
      case '/contacts/add':
        this.activeRoute = 'contacts';
      break;
      case '/contact/edit/' + this.route.snapshot.paramMap.get('id'):
        this.activeRoute = 'contacts';
      break;
      case '/contact/' + this.route.snapshot.paramMap.get('id'):
        this.activeRoute = 'contacts';
      break;

      case '/companies':
        this.activeRoute = 'companies';
      break;
      case '/companies/add':
        this.activeRoute = 'companies';
      break;
      case '/company/edit/' + this.route.snapshot.paramMap.get('id'):
        this.activeRoute = 'companies';
      break;
      case '/company/' + this.route.snapshot.paramMap.get('id'):
        this.activeRoute = 'companies';
      break;

      case '/pipelines':
        this.activeRoute = 'pipelines';
      break;
      case '/pipelines/add':
        this.activeRoute = 'pipelines';
      break;
      case '/pipeline/edit/' + this.route.snapshot.paramMap.get('id'):
        this.activeRoute = 'pipelines';
      break;
      case '/pipeline/' + this.route.snapshot.paramMap.get('id'):
        this.activeRoute = 'pipelines';
      break;

      case '/settings':
        this.activeRoute = 'settings';
      break;

      default:
        this.activeRoute = 'dashboard';
      break;
    }
  }

}
