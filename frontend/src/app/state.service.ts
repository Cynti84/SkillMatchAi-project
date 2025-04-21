import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private userState = new BehaviorSubject<any>(null); //holds current state
  currentUser = this.userState.asObservable(); //exposes the state to other components

  constructor() { }

  setUser(user: any) {
    this.userState.next(user); //Updates the state
  }
}
