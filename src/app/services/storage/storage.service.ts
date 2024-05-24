import { Injectable } from '@angular/core';
import { UserAuth } from '../../models/user-auth/user-auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public static readonly USER_INFO_KEY = 'questionnaire-user-info';
  public static readonly REMAINING_EXAM_TIME_KEY = 'remaining_exam_time';

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

  saveRemainingExamTime(hour :number, minute: number, second: number){
    console.log('saveRemainingExamTime: ' + hour + " minute" + minute + " second" + second)
    sessionStorage.setItem(StorageService.REMAINING_EXAM_TIME_KEY, `${hour}|${minute}|${second}`);
    console.log('after saveRemainingExamTime: ' +  sessionStorage.getItem(StorageService.REMAINING_EXAM_TIME_KEY));
  }

  getRemainingExamTime():[number, number, number]{
    const remainingExamTImeStr = sessionStorage.getItem(StorageService.REMAINING_EXAM_TIME_KEY);
    console.log('getRemainingExamTime: ' +  remainingExamTImeStr);
    const remainingExamTime = remainingExamTImeStr?.split('|');
    if(remainingExamTime !== undefined){
      return [Number(remainingExamTime[0]), Number(remainingExamTime[1]), Number(remainingExamTime[2])];
    }
    else{
      return [0,0,0];
    }
    
  }

}
