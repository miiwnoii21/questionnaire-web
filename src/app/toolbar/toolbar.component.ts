import { Component } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {
  FullName : string = ''
  IsLogIn : boolean = false
  constructor(private storageService: StorageService){

  }

  ngOnInit() {
    const userInfo = this.storageService.getUserAuth();
    if(userInfo !== null){
      this.FullName = `Hello, ${userInfo.fullName}`;
      this.IsLogIn = true
    }
  }
}
