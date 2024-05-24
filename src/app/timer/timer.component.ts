import { Component, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {
  // @Input() limitTimerInMinute: number = 0;
  hour: number = 0
  minute: number = 0
  second: number = 0
  hourDisplay: string = ''
  minuteDisplay: string = ''
  secondDisplay: string = ''
  @Output() timeUpEvent = new EventEmitter<boolean>();

  constructor(private storageService: StorageService){

  }

  ngOnInit(){
    // [this.hour, this.minute, this.second] = this.storageService.getRemainingExamTime();
    // console.log(`timer init: ${this.hour} : ${this.minute} : ${this.second}`)
    // if(this.hour !== 0 || this.minute !==0 || this.second !== 0){
    //   this.secondDisplay = this.padTimeDigit(this.second);
    //   this.minuteDisplay = this.padTimeDigit(this.minute);
    //   this.hourDisplay = this.padTimeDigit(this.hour);
    //   let timer = setInterval(() => this.countDownTimer(),1000);
    // }
    //[this.hour, this.minute, this.second] = this.storageService.getRemainingExamTime();

    let timer = setInterval(() => this.countDownTimer(),1000);

  }


  padTimeDigit(time: number): string{
    return time.toString().padStart(2, '0');
  }

  countDownTimer(){

    [this.hour, this.minute, this.second] = this.storageService.getRemainingExamTime();
    if(this.hour === 0 && this.minute === 0 && this.second === 0){
      console.log("time up!")
      this.timeUpEvent.emit(true);
    }
    else if(this.second === 0){
      if(this.minute > 0){
        --this.minute;
      }
      else if(this.hour > 0){
        --this.hour;
        this.minute = 59;
      }
      this.second = 59;
    }
    else if(this.second > 0){
      --this.second;
    }
    this.storageService.saveRemainingExamTime(this.hour, this.minute, this.second)
    this.secondDisplay = this.padTimeDigit(this.second);
    this.minuteDisplay = this.padTimeDigit(this.minute);
    this.hourDisplay = this.padTimeDigit(this.hour);
    //console.log(`countDownTimer: ${this.hourDisplay} : ${this.minuteDisplay} : ${this.secondDisplay}`)
  }
}
