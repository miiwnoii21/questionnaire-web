import { Injectable } from '@angular/core';
import { UserAuth } from '../../models/user-auth/user-auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public static readonly USER_INFO_KEY = 'questionnaire-user-info';

  constructor() { }

  saveUserAuth(user: UserAuth){
    sessionStorage.setItem(StorageService.USER_INFO_KEY, JSON.stringify(user))
    //sessionStorage.setItem(StorageService.USER_ACCESS_TOKEN_EXPIRED_DATE_KEY, user.expiredDate.toLocaleString("en-US"))
    console.log("expiredDate: " + user.expiredDate.toLocaleString("en-US"))
  }

  getUserAuth(): UserAuth | null{
    const userInfoStr = sessionStorage.getItem(StorageService.USER_INFO_KEY);
    return userInfoStr ? JSON.parse(userInfoStr) : null;
  }

  terminateUserAuth(){
    sessionStorage.removeItem(StorageService.USER_INFO_KEY)
  }
}
