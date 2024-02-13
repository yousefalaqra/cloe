import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { AppFacade } from '../core/app.facade';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  username = new FormControl('');
  password = new FormControl('');

  subscriptions: Subscription;
  loadingSubscriptions: Subscription;

  loading: boolean;
  constructor(private _appFacade: AppFacade) {}
  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this.loadingSubscriptions = this._appFacade.loading$.subscribe(
      (x) => (this.loading = x)
    );
  }

  onLogin() {
    let email = this.username.value;
    let password = this.password.value;

    if (!email || !password) return;

    this.subscriptions = this._appFacade
      .login({ emailAddress: email, password: password, username: email })
      .subscribe();
  }
  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
