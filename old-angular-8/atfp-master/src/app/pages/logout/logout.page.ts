import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {
  c: boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    this.c = confirm("هل تريد تسجيل الخروج");
    if (this.c) {
      localStorage.removeItem('usertoken');
      this.router.navigate(['/login']);
      window.location.reload();

    }
  }
}
