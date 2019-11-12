import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResponseContentType } from '../common/enums/http-enums';
import { AuthenticationService } from './authentication.service';
//import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpClientCustom {
  constructor(private http: HttpClient
    , private authSvc: AuthenticationService
    , private router: Router) { }

  createAuthorizationHeader(headers: HttpHeaders) {
    headers.append('Content-Type', 'application/json');
    // headers.append('Authorization', 'Bearer ' + this.authSvc.getToken());
  }

  createAuthorizationHeaderForUploading(headers: HttpHeaders) {
    //headers.append('Authorization', 'Bearer ' + this.authSvc.token);
  }

  getBlob(url: string) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers,
      responseType: ResponseContentType.Blob
    });
  }
  postBlob(url: string, data: any) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers,
      responseType: ResponseContentType.Blob
    });
  }

  get(url: string) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers,
    });

  }

  post(url: string, data: any) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers,
    });
  }

  put(url: string, data: any) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers,
    });
  }

  delete(url: string) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers,
    });
  }

  upload(url: string, data: any) {
    // if (!this.authSvc.isLoggedIn) {
    //   this.redirectToLoginPage();
    // }
    const headers = new HttpHeaders();
    this.createAuthorizationHeaderForUploading(headers);
    return this.http.post(url, data, {
      headers: headers,
    });
  }

  redirectToLoginPage() {
    this.router.navigate(['/login']);
  }
}
