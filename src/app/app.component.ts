import {Component, OnInit} from '@angular/core';
import {ServiceAuth} from './services/app.service.auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'decos-srt';
  authorized = false;

  constructor(
    public authService: ServiceAuth,
    public router: Router) {
  }

  ngOnInit() { }

  public async onClick() {
    this.authorized = await this.authService.googleSignIn();
    this.checkRoute();
  }

  public async checkRoute(): Promise<void> {
    if (!this.authorized) { return; }

    await this.router.navigate(['/posts']);
  }
}
