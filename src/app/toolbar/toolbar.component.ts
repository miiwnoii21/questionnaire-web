import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  FullName : string = ''
  IsLogIn : boolean = false
  constructor(private storageService: StorageService, private router: Router){

  }

  ngOnInit() {
    const userInfo = this.storageService.getUserAuth();
    if(userInfo !== null){
      this.FullName = `Hello, ${userInfo.fullName}`;
      this.IsLogIn = true
    }
  }

  logout(){
    this.storageService.terminateUserAuth();
    this.router.navigate(['/login']);
  }
}
