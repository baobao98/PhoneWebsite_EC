import { Injectable } from '@angular/core'
import { HttpClient } from "@angular/common/http"
import { Observable, of } from 'rxjs'
import { map } from 'rxjs/operators'
import { Router } from '@angular/router'

export interface UserDetails {
  _id: string
  first_name: string
  last_name: string
  email: string,
  password: string
  address: string
  phoneNumber: number
  gender: boolean
  birthday: Date
  exp: number
  iat: number
}

interface TokenResponse {   //token from the backend to frontend
  token: string
}

export interface TokenPayload {
  _id: string
  first_name: string
  last_name: string
  email: string
  password: string
  address: string
  phoneNumber: number
  gender: boolean
  birthday: Date
}

@Injectable()
export class AuthenticationService {
  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token) //save token at storage browser in client
    this.token = token; // assign token variable
  }

  getToken(): string {
    if (!this.token) { // check if this the token has existed
      this.token = localStorage.getItem('usertoken') // if not: get token from browser client
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken(); //first get the token from localStorage
    let payload
    if (token) {
      payload = token.split('.')[1] //
      payload = window.atob(payload) //decode base64 to string
      return JSON.parse(payload)  // then convert the string decoded to json
    } else {
      return null
    }
  }

  //check user still alive or not
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: TokenPayload): Observable<any> {
    const base = this.http.post('/users/register', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post('/users/login', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        } return data
      })
    )

    return request
  }

  public profile(): Observable<any> {
    return this.http.get(`/users/profile`, {
      headers: { Authorization: ` ${this.getToken()}` }
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
