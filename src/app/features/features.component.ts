import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) {
    this.authService.validateToken().subscribe();
  }

  ngOnInit(): void {
  }

}
