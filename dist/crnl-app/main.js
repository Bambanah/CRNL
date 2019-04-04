(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/_guards/auth.guard.ts":
/*!***************************************!*\
  !*** ./src/app/_guards/auth.guard.ts ***!
  \***************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var currentUser = this.auth.currentUser;
        if (currentUser) {
            if (route.data.roles &&
                route.data.roles.indexOf(currentUser.__t) === -1) {
                this.router.navigate(['/']);
                return false;
            }
            // Authorised
            return true;
        }
        // Not logged in so redirect to login page with return url
        this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: state.url }
        });
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/app/_services/api.service.ts":
/*!******************************************!*\
  !*** ./src/app/_services/api.service.ts ***!
  \******************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
};
var apiUrl = '/api';
var ApiService = /** @class */ (function () {
    function ApiService(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    ApiService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])('Something bad happened; please try again later.');
    };
    ApiService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    ApiService.prototype.getUsers = function () {
        return this.http.get(apiUrl + '/users/');
    };
    ApiService.prototype.getStudents = function () {
        return this.http.get(apiUrl + '/students/');
    };
    ApiService.prototype.getTeams = function () {
        return this.http.get(apiUrl + '/teams/');
    };
    ApiService.prototype.getUser = function (userId) {
        var url = apiUrl + "/users/" + userId;
        return this.http.get(url, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.getPosts = function () {
        var url = apiUrl + "/posts/";
        return this.http.get(url, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.getPost = function (postId) {
        var url = apiUrl + "/posts/" + postId;
        return this.http.get(url, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.postPost = function (postData) {
        var url = apiUrl + "/posts/";
        return this.http
            .post(url, postData, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.updatePost = function (postData) {
        var url = apiUrl + "/posts/";
        return this.http
            .put(url, postData, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.deletePost = function (postId) {
        var url = apiUrl + "/posts/" + postId;
        return this.http
            .delete(url, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.createTeam = function (data) {
        var url = apiUrl + '/teams';
        return this.http
            .post(url, data, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.addToTeam = function (userId) {
        var url = apiUrl + "/teams/add/";
        var data = {
            hostId: this.auth.currentUserId,
            guestId: userId
        };
        return this.http
            .post(url, data, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.removeFromTeam = function (teamId, userId) {
        var url = apiUrl + "/teams/" + teamId + "/remove/" + userId;
        return this.http.post(url, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.deleteTeam = function (teamId) {
        var url = apiUrl + "/teams/" + teamId;
        return this.http
            .delete(url, httpOptions)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.getTeamIdFromUser = function (userId) {
        var url = apiUrl + "/users/" + userId + "/team/";
        return this.http.get(url, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.getMembersOfTeam = function (teamId) {
        var url = apiUrl + "/teams/" + teamId + "/members";
        return this.http.get(url, httpOptions).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(this.extractData), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    ApiService.prototype.isInTeam = function (userId) {
        var teamId = this.getTeamIdFromUser(userId);
        return teamId != undefined;
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/_services/auth.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/auth.service.ts ***!
  \*******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var apiUrl = '/api';
var helper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_4__["JwtHelperService"]();
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
    }
    AuthService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Something bad happened; please try again later.');
    };
    AuthService.prototype.login = function (loginData) {
        return this.http.post(apiUrl + '/users/authenticate', loginData).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (user) {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        }));
    };
    AuthService.prototype.logout = function () {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    };
    AuthService.prototype.signup = function (signupData) {
        var url = apiUrl + '/students/';
        return this.http.post(url, signupData).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(this.handleError));
    };
    Object.defineProperty(AuthService.prototype, "isAuthenticated", {
        get: function () {
            return localStorage.getItem('currentUser') === null ? false : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUser", {
        get: function () {
            var decodedToken = helper.decodeToken(localStorage.getItem('currentUser'));
            return decodedToken;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthService.prototype, "currentUserId", {
        get: function () {
            var decodedToken = helper.decodeToken(localStorage.getItem('currentUser'));
            return decodedToken._id;
        },
        enumerable: true,
        configurable: true
    });
    // Test if ID belongs to currently signed in user
    AuthService.prototype.isSelf = function (id) {
        return this.currentUserId === id ? true : false;
    };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({ providedIn: 'root' }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./src/app/admin/staff-dashboard/staff-dashboard.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/admin/staff-dashboard/staff-dashboard.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"team-container\">\r\n    <h2>Teams</h2>\r\n    <!-- <span>\r\n      Show\r\n      <select>\r\n        <option value=\"all\">all</option>\r\n        <option value=\"complete\">complete</option>\r\n        <option value=\"incomplete\">incomplete</option>\r\n      </select>\r\n      Teams\r\n    </span> -->\r\n    <table class=\"mat-elevation-z2\">\r\n      <tr>\r\n        <th>\r\n          Name\r\n        </th>\r\n      </tr>\r\n\r\n      <tr *ngFor=\"let team of teams\" routerLink=\"/teams/{{ team._id }}\">\r\n        <td>{{ team.name }}</td>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n  <hr />\r\n\r\n  <div class=\"student-container\">\r\n    <h2>Students</h2>\r\n    <table>\r\n      <tr>\r\n        <th>\r\n          Name\r\n        </th>\r\n        <th>\r\n          Team\r\n        </th>\r\n      </tr>\r\n\r\n      <tr\r\n        *ngFor=\"let student of students\"\r\n        routerLink=\"/users/{{ student._id }}\"\r\n        [ngClass]=\"{inTeam: student.team}\"\r\n      >\r\n        <td>{{ student.full_name }}</td>\r\n\r\n        <ng-container *ngIf=\"student.team; else elseTemplate\">\r\n          <td>{{ student.team }}</td>\r\n        </ng-container>\r\n        <ng-template #elseTemplate>\r\n          <td>-</td>\r\n        </ng-template>\r\n      </tr>\r\n    </table>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/admin/staff-dashboard/staff-dashboard.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/admin/staff-dashboard/staff-dashboard.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  padding-top: 4rem; }\n\ntable {\n  width: 100%;\n  border-radius: 5px;\n  overflow: hidden; }\n\ntable tr {\n    cursor: pointer; }\n\ntable tr td,\n    table tr th {\n      padding: 20px 10px; }\n\ntable .inTeam {\n    background-color: rgba(20, 120, 20, 0.3); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYWRtaW4vc3RhZmYtZGFzaGJvYXJkL0Q6XFxMaWJyYXJpZXNcXERvY3VtZW50c1xcRG9jdW1lbnRzXFxHaXRcXENSTkwvc3JjXFxhcHBcXGFkbWluXFxzdGFmZi1kYXNoYm9hcmRcXHN0YWZmLWRhc2hib2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsZ0JBQWdCLEVBQUE7O0FBSGxCO0lBTUksZUFBZSxFQUFBOztBQU5uQjs7TUFVTSxrQkFBa0IsRUFBQTs7QUFWeEI7SUFjSSx3Q0FBd0MsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3N0YWZmLWRhc2hib2FyZC9zdGFmZi1kYXNoYm9hcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcclxuICBwYWRkaW5nLXRvcDogNHJlbTtcclxufVxyXG5cclxudGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG5cclxuICB0ciB7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG4gICAgdGQsXHJcbiAgICB0aCB7XHJcbiAgICAgIHBhZGRpbmc6IDIwcHggMTBweDtcclxuICAgIH1cclxuICB9XHJcbiAgLmluVGVhbSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIwLCAxMjAsIDIwLCAwLjMpO1xyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/admin/staff-dashboard/staff-dashboard.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/admin/staff-dashboard/staff-dashboard.component.ts ***!
  \********************************************************************/
/*! exports provided: StaffDashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaffDashboardComponent", function() { return StaffDashboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/api.service */ "./src/app/_services/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StaffDashboardComponent = /** @class */ (function () {
    function StaffDashboardComponent(api) {
        this.api = api;
    }
    StaffDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getStudents().subscribe(function (res) {
            _this.students = res;
        }, function (err) {
            console.warn(err);
        });
        this.api.getTeams().subscribe(function (res) {
            _this.teams = res;
        }, function (err) {
            console.warn(err);
        });
    };
    StaffDashboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-staff-dashboard',
            template: __webpack_require__(/*! ./staff-dashboard.component.html */ "./src/app/admin/staff-dashboard/staff-dashboard.component.html"),
            styles: [__webpack_require__(/*! ./staff-dashboard.component.scss */ "./src/app/admin/staff-dashboard/staff-dashboard.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], StaffDashboardComponent);
    return StaffDashboardComponent;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_guards/auth.guard */ "./src/app/_guards/auth.guard.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _users_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./users/user-list/user-list.component */ "./src/app/users/user-list/user-list.component.ts");
/* harmony import */ var _users_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./users/user-profile/user-profile.component */ "./src/app/users/user-profile/user-profile.component.ts");
/* harmony import */ var _teams_team_list_team_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./teams/team-list/team-list.component */ "./src/app/teams/team-list/team-list.component.ts");
/* harmony import */ var _teams_team_profile_team_profile_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./teams/team-profile/team-profile.component */ "./src/app/teams/team-profile/team-profile.component.ts");
/* harmony import */ var _admin_staff_dashboard_staff_dashboard_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./admin/staff-dashboard/staff-dashboard.component */ "./src/app/admin/staff-dashboard/staff-dashboard.component.ts");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./auth/login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./auth/signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"],
        data: { title: 'Home' }
    },
    {
        path: 'auth/login',
        component: _auth_login_login_component__WEBPACK_IMPORTED_MODULE_9__["LoginComponent"]
    },
    {
        path: 'auth/signup',
        component: _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_10__["SignupComponent"]
    },
    {
        path: 'users',
        component: _users_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_4__["UserListComponent"],
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        data: { roles: ['Student', 'Staff'] }
    },
    {
        path: 'users/:id',
        component: _users_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_5__["UserProfileComponent"],
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        data: { roles: ['Student', 'Staff'] }
    },
    {
        path: 'profile',
        component: _users_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_5__["UserProfileComponent"],
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        data: { self: true }
    },
    {
        path: 'teams',
        component: _teams_team_list_team_list_component__WEBPACK_IMPORTED_MODULE_6__["TeamListComponent"],
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        data: { roles: ['Student', 'Staff'] }
    },
    {
        path: 'teams/:id',
        component: _teams_team_profile_team_profile_component__WEBPACK_IMPORTED_MODULE_7__["TeamProfileComponent"],
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        data: { roles: ['Student', 'Staff'] }
    },
    {
        path: 'staff',
        redirectTo: 'staff/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'staff/dashboard',
        component: _admin_staff_dashboard_staff_dashboard_component__WEBPACK_IMPORTED_MODULE_8__["StaffDashboardComponent"],
        canActivate: [_guards_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]],
        data: { roles: ['Staff'] }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-container\">\r\n  <div class=\"app-header\">\r\n    <app-main-nav></app-main-nav>\r\n  </div>\r\n\r\n  <div class=\"body\">\r\n    <router-outlet></router-outlet>\r\n  </div>\r\n\r\n  <div class=\"app-footer\">\r\n    <app-footer></app-footer>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "html,\nbody {\n  margin: 0;\n  padding: 0;\n  height: 100%; }\n\n.main-container {\n  min-height: 100%;\n  width: 100%;\n  position: absolute;\n  display: flex;\n  flex-flow: column; }\n\n.app-header {\n  flex: 0 1 auto; }\n\n.body {\n  flex: 1 1 auto; }\n\n.app-footer {\n  flex: 0 1 auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvRDpcXExpYnJhcmllc1xcRG9jdW1lbnRzXFxEb2N1bWVudHNcXEdpdFxcQ1JOTC9zcmNcXGFwcFxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOztFQUVFLFNBQVM7RUFDVCxVQUFVO0VBQ1YsWUFBWSxFQUFBOztBQUdkO0VBQ0UsZ0JBQWdCO0VBQ2hCLFdBQVc7RUFDWCxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLGNBQWMsRUFBQTs7QUFHaEI7RUFDRSxjQUFjLEVBQUE7O0FBR2hCO0VBQ0UsY0FBYyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVmaW5lIGdsb2JhbCB2YWx1ZXNcclxuXHJcbmh0bWwsXHJcbmJvZHkge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLm1haW4tY29udGFpbmVyIHtcclxuICBtaW4taGVpZ2h0OiAxMDAlO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZmxvdzogY29sdW1uO1xyXG59XHJcblxyXG4uYXBwLWhlYWRlciB7XHJcbiAgZmxleDogMCAxIGF1dG87XHJcbn1cclxuXHJcbi5ib2R5IHtcclxuICBmbGV4OiAxIDEgYXV0bztcclxufVxyXG5cclxuLmFwcC1mb290ZXIge1xyXG4gIGZsZXg6IDAgMSBhdXRvO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'QUT Compass';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ "./node_modules/@fortawesome/angular-fontawesome/fesm5/angular-fontawesome.js");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "./node_modules/@fortawesome/fontawesome-svg-core/index.es.js");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "./node_modules/@fortawesome/free-solid-svg-icons/index.es.js");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shared/footer/footer.component */ "./src/app/shared/footer/footer.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _shared_main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared/main-nav/main-nav.component */ "./src/app/shared/main-nav/main-nav.component.ts");
/* harmony import */ var _posts_post_create_post_create_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./posts/post-create/post-create.component */ "./src/app/posts/post-create/post-create.component.ts");
/* harmony import */ var _posts_post_list_post_list_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./posts/post-list/post-list.component */ "./src/app/posts/post-list/post-list.component.ts");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./search-bar/search-bar.component */ "./src/app/search-bar/search-bar.component.ts");
/* harmony import */ var _auth_login_login_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./auth/login/login.component */ "./src/app/auth/login/login.component.ts");
/* harmony import */ var _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./auth/signup/signup.component */ "./src/app/auth/signup/signup.component.ts");
/* harmony import */ var _users_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./users/user-list/user-list.component */ "./src/app/users/user-list/user-list.component.ts");
/* harmony import */ var _users_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./users/user-profile/user-profile.component */ "./src/app/users/user-profile/user-profile.component.ts");
/* harmony import */ var _teams_team_list_team_list_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./teams/team-list/team-list.component */ "./src/app/teams/team-list/team-list.component.ts");
/* harmony import */ var _teams_team_profile_team_profile_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./teams/team-profile/team-profile.component */ "./src/app/teams/team-profile/team-profile.component.ts");
/* harmony import */ var _admin_staff_dashboard_staff_dashboard_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./admin/staff-dashboard/staff-dashboard.component */ "./src/app/admin/staff-dashboard/staff-dashboard.component.ts");
/* harmony import */ var _shared_loading_loading_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./shared/loading/loading.component */ "./src/app/shared/loading/loading.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



























var AppModule = /** @class */ (function () {
    function AppModule() {
        _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_8__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_9__["faCircle"]);
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"],
                _shared_footer_footer_component__WEBPACK_IMPORTED_MODULE_12__["FooterComponent"],
                _shared_main_nav_main_nav_component__WEBPACK_IMPORTED_MODULE_14__["MainNavComponent"],
                _posts_post_create_post_create_component__WEBPACK_IMPORTED_MODULE_15__["PostCreateComponent"],
                _posts_post_list_post_list_component__WEBPACK_IMPORTED_MODULE_16__["PostListComponent"],
                _search_bar_search_bar_component__WEBPACK_IMPORTED_MODULE_18__["SearchBarComponent"],
                _auth_login_login_component__WEBPACK_IMPORTED_MODULE_19__["LoginComponent"],
                _auth_signup_signup_component__WEBPACK_IMPORTED_MODULE_20__["SignupComponent"],
                _users_user_list_user_list_component__WEBPACK_IMPORTED_MODULE_21__["UserListComponent"],
                _users_user_profile_user_profile_component__WEBPACK_IMPORTED_MODULE_22__["UserProfileComponent"],
                _teams_team_list_team_list_component__WEBPACK_IMPORTED_MODULE_23__["TeamListComponent"],
                _teams_team_profile_team_profile_component__WEBPACK_IMPORTED_MODULE_24__["TeamProfileComponent"],
                _admin_staff_dashboard_staff_dashboard_component__WEBPACK_IMPORTED_MODULE_25__["StaffDashboardComponent"],
                _shared_loading_loading_component__WEBPACK_IMPORTED_MODULE_26__["LoadingComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_13__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["LayoutModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_17__["BrowserAnimationsModule"],
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_10__["NgbModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSortModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatOptionModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"],
                _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_7__["FontAwesomeModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__["AppComponent"]]
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/auth/auth.scss":
/*!********************************!*\
  !*** ./src/app/auth/auth.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Roboto|Titillium+Web|Montserrat|Comfortaa|Open+Sans:400,600|Patua+One\");\n* {\n  font-family: \"Open Sans\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Roboto\", sans-serif; }\na {\n  color: #003b71;\n  text-decoration: none; }\na:hover {\n    text-decoration: underline;\n    color: #0056a4; }\nhtml,\nbody {\n  height: 100%; }\nbody {\n  margin: 0;\n  font-family: \"Open Sans\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Roboto\", sans-serif; }\n.invalid-feedback {\n  display: block; }\nlabel {\n  font-size: 0.8rem;\n  text-align: center; }\n.container {\n  position: absolute;\n  max-width: 100%;\n  width: 100%;\n  min-height: calc(100% - 63px - 80px);\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n.content {\n  position: relative;\n  width: 350px;\n  text-align: center; }\n.btn-primary {\n  width: 100%;\n  font-weight: bold;\n  padding: 15px;\n  border-radius: 0;\n  background-color: white;\n  border: 1px solid #003b71;\n  color: black;\n  margin-top: 50px; }\n.btn-primary:disabled {\n    background-color: #ddd; }\n.p-top {\n  margin-bottom: 50px; }\n.p-bottom {\n  margin-top: 50px; }\ninput {\n  border-radius: 0;\n  border: none;\n  border-bottom: 1px solid #ddd;\n  padding: 10px 3px; }\ninput:hover {\n    box-shadow: none;\n    background-color: rgba(72, 149, 185, 0.05); }\ninput:focus {\n    box-shadow: none;\n    background-color: rgba(72, 149, 185, 0.1); }\ninput.invalid {\n    border-bottom: 1px solid #ff6565; }\n.invalid-feedback {\n  text-align: right;\n  position: absolute;\n  margin-top: -28px;\n  left: -360px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9EOlxcTGlicmFyaWVzXFxEb2N1bWVudHNcXERvY3VtZW50c1xcR2l0XFxDUk5ML3NyY1xcc3R5bGVzLnNjc3MiLCJzcmMvYXBwL2F1dGgvRDpcXExpYnJhcmllc1xcRG9jdW1lbnRzXFxEb2N1bWVudHNcXEdpdFxcQ1JOTC9zcmNcXGFwcFxcYXV0aFxcYXV0aC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRIQUFZO0FBV1o7RUFDRSwrR0FSc0MsRUFBQTtBQVd4QztFQUNFLGNBVjZCO0VBVzdCLHFCQUFxQixFQUFBO0FBRnZCO0lBS0ksMEJBQTBCO0lBQzFCLGNBQW1DLEVBQUE7QUFJdkM7O0VBRUUsWUFBWSxFQUFBO0FBR2Q7RUFDRSxTQUFTO0VBQ1QsK0dBNUJzQyxFQUFBO0FDRnhDO0VBQ0UsY0FBYyxFQUFBO0FBR2hCO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQixFQUFBO0FBR3BCO0VBQ0Usa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixXQUFXO0VBQ1gsb0NBQW9DO0VBRXBDLFVBQVU7RUFDVixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHVCQUF1QjtFQUN2QixtQkFBbUIsRUFBQTtBQUdyQjtFQUNFLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osa0JBQWtCLEVBQUE7QUFHcEI7RUFDRSxXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsdUJBQXVCO0VBQ3ZCLHlCRDlCNkI7RUMrQjdCLFlBQVk7RUFDWixnQkFBZ0IsRUFBQTtBQVJsQjtJQVdJLHNCQUFzQixFQUFBO0FBSTFCO0VBQ0UsbUJBQW1CLEVBQUE7QUFHckI7RUFDRSxnQkFBZ0IsRUFBQTtBQUdsQjtFQUNFLGdCQUFnQjtFQUNoQixZQUFZO0VBQ1osNkJBQTZCO0VBQzdCLGlCQUFpQixFQUFBO0FBSm5CO0lBT0ksZ0JBQWdCO0lBQ2hCLDBDQUFzQyxFQUFBO0FBUjFDO0lBWUksZ0JBQWdCO0lBQ2hCLHlDQUFzQyxFQUFBO0FBYjFDO0lBaUJJLGdDQUEyQyxFQUFBO0FBSS9DO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsWUFBWSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvYXV0aC9hdXRoLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90b3xUaXRpbGxpdW0rV2VifE1vbnRzZXJyYXR8Q29tZm9ydGFhfE9wZW4rU2Fuczo0MDAsNjAwfFBhdHVhK09uZScpO1xyXG4vLyBAaW1wb3J0ICcuLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvYm9vdHN0cmFwJztcclxuXHJcbiRmb250LWZhbWlseS0xOiAnT3BlbiBTYW5zJywgJ0hlbHZldGljYU5ldWUtTGlnaHQnLCAnSGVsdmV0aWNhIE5ldWUgTGlnaHQnLFxyXG4gICdIZWx2ZXRpY2EgTmV1ZScsICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xyXG5cclxuJGNvbG9yLXByaW1hcnk6IHJnYigwLCA1OSwgMTEzKTtcclxuJGNvbG9yLXNlY29uZGFyeTogcmdiKDE0MiwgMTQ0LCAxNDQpO1xyXG4kY29sb3ItZGFyazogcmdiKDg2LCA5MSwgOTUpO1xyXG4kY29sb3Itc3VwcG9ydDogcmdiKDAsIDEzNCwgMTE3KTtcclxuXHJcbioge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktMTtcclxufVxyXG5cclxuYSB7XHJcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgIGNvbG9yOiBsaWdodGVuKCRjb2xvci1wcmltYXJ5LCAxMCUpO1xyXG4gIH1cclxufVxyXG5cclxuaHRtbCxcclxuYm9keSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS0xO1xyXG59XHJcbiIsIkBpbXBvcnQgJ3NyYy9zdHlsZXMuc2Nzcyc7XHJcblxyXG4uaW52YWxpZC1mZWVkYmFjayB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbmxhYmVsIHtcclxuICBmb250LXNpemU6IDAuOHJlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gNjNweCAtIDgwcHgpO1xyXG5cclxuICBwYWRkaW5nOiAwO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uY29udGVudCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiAzNTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgcGFkZGluZzogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvci1wcmltYXJ5O1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG5cclxuICAmOmRpc2FibGVkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XHJcbiAgfVxyXG59XHJcblxyXG4ucC10b3Age1xyXG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XHJcbn1cclxuXHJcbi5wLWJvdHRvbSB7XHJcbiAgbWFyZ2luLXRvcDogNTBweDtcclxufVxyXG5cclxuaW5wdXQge1xyXG4gIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xyXG4gIHBhZGRpbmc6IDEwcHggM3B4O1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCRjb2xvcjogIzQ4OTViOSwgJGFscGhhOiAwLjA1KTtcclxuICB9XHJcblxyXG4gICY6Zm9jdXMge1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoJGNvbG9yOiAjNDg5NWI5LCAkYWxwaGE6IDAuMSk7XHJcbiAgfVxyXG5cclxuICAmLmludmFsaWQge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYigyNTUsIDEwMSwgMTAxKTtcclxuICB9XHJcbn1cclxuXHJcbi5pbnZhbGlkLWZlZWRiYWNrIHtcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luLXRvcDogLTI4cHg7XHJcbiAgbGVmdDogLTM2MHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/auth/login/login.component.html":
/*!*************************************************!*\
  !*** ./src/app/auth/login/login.component.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"content\">\r\n    <p class=\"p-top\">Log in to access full functionality</p>\r\n    <form\r\n      [formGroup]=\"loginForm\"\r\n      (ngSubmit)=\"onSubmit(loginForm.value)\"\r\n      class=\"loginForm form\"\r\n    >\r\n      <div class=\"form-group\">\r\n        <input\r\n          type=\"text\"\r\n          formControlName=\"email\"\r\n          class=\"form-control\"\r\n          placeholder=\"Email\"\r\n          [ngClass]=\"{\r\n            invalid:\r\n              !loginForm.get('email').valid && loginForm.get('email').touched\r\n          }\"\r\n          autofocus\r\n        />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input\r\n          type=\"password\"\r\n          formControlName=\"password\"\r\n          class=\"form-control\"\r\n          placeholder=\"Password\"\r\n          [ngClass]=\"{\r\n            invalid:\r\n              !loginForm.get('password').valid &&\r\n              loginForm.get('password').touched\r\n          }\"\r\n        />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <button\r\n          [disabled]=\"loading || !loginForm.valid\"\r\n          class=\"btn btn-primary\"\r\n        >\r\n          Login\r\n        </button>\r\n        <img\r\n          *ngIf=\"loading\"\r\n          src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\"\r\n        />\r\n      </div>\r\n      <div *ngIf=\"error\" class=\"alert alert-danger\">{{ error }}</div>\r\n    </form>\r\n    <p class=\"p-bottom\">\r\n      Don't have an account? <a [routerLink]=\"['/auth/signup']\">Register</a>\r\n    </p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/auth/login/login.component.ts":
/*!***********************************************!*\
  !*** ./src/app/auth/login/login.component.ts ***!
  \***********************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, route, router, auth) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.loading = false;
        this.submitted = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            email: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        // reset login status
        this.auth.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.onSubmit = function (form) {
        var _this = this;
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.auth
            .login(form)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["first"])())
            .subscribe(function (data) {
            _this.router.navigate([_this.returnUrl]);
        }, function (error) {
            console.warn(error);
            _this.loading = false;
        });
    };
    LoginComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! ./login.component.html */ "./src/app/auth/login/login.component.html"),
            styles: [__webpack_require__(/*! ../auth.scss */ "./src/app/auth/auth.scss")]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/auth/signup/signup.component.html":
/*!***************************************************!*\
  !*** ./src/app/auth/signup/signup.component.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"content\">\r\n    <form\r\n      [formGroup]=\"signupForm\"\r\n      (ngSubmit)=\"onSubmit(signupForm.value)\"\r\n      class=\"signupForm form\"\r\n    >\r\n      <div class=\"form-group\">\r\n        <input\r\n          type=\"text\"\r\n          formControlName=\"full_name\"\r\n          class=\"form-control\"\r\n          placeholder=\"Full Name\"\r\n          [ngClass]=\"{\r\n            invalid:\r\n              !signupForm.get('full_name').valid &&\r\n              signupForm.get('full_name').touched\r\n          }\"\r\n          autofocus\r\n        />\r\n      </div>\r\n      <!-- TODO: Select major and minor from available list -->\r\n      <div class=\"form-group\">\r\n        <input\r\n          type=\"text\"\r\n          formControlName=\"major\"\r\n          class=\"form-control\"\r\n          placeholder=\"Major\"\r\n          [ngClass]=\"{\r\n            invalid:\r\n              !signupForm.get('major').valid && signupForm.get('major').touched\r\n          }\"\r\n        />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input\r\n          type=\"text\"\r\n          formControlName=\"minor\"\r\n          class=\"form-control\"\r\n          placeholder=\"Minor\"\r\n          [ngClass]=\"{\r\n            invalid:\r\n              !signupForm.get('minor').valid && signupForm.get('minor').touched\r\n          }\"\r\n        />\r\n      </div>\r\n      <!-- TODO: Validate email format -->\r\n      <div class=\"form-group\">\r\n        <input\r\n          type=\"text\"\r\n          formControlName=\"email\"\r\n          class=\"form-control\"\r\n          placeholder=\"Email\"\r\n          [ngClass]=\"{\r\n            invalid:\r\n              !signupForm.get('email').valid && signupForm.get('email').touched\r\n          }\"\r\n        />\r\n      </div>\r\n      <!-- TODO: validate passwords are different -->\r\n      <div class=\"form-group\">\r\n        <input\r\n          type=\"password\"\r\n          formControlName=\"password\"\r\n          class=\"form-control\"\r\n          placeholder=\"Password\"\r\n          [ngClass]=\"{\r\n            invalid:\r\n              !signupForm.get('password').valid &&\r\n              signupForm.get('password').touched\r\n          }\"\r\n          required\r\n        />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input\r\n          type=\"password\"\r\n          formControlName=\"password_confirm\"\r\n          class=\"form-control\"\r\n          placeholder=\"Confirm Password\"\r\n          [ngClass]=\"{\r\n            invalid:\r\n              signupForm.get('password').touched &&\r\n              signupForm.get('password_confirm').touched &&\r\n              signupForm.get('password') != signupForm.get('password_confirm')\r\n          }\"\r\n          required\r\n        />\r\n        <div\r\n          *ngIf=\"\r\n            signupForm.get('password').touched &&\r\n            signupForm.get('password_confirm').touched &&\r\n            signupForm.get('password') != signupForm.get('password_confirm')\r\n          \"\r\n          class=\"invalid-feedback\"\r\n        >\r\n          Passwords don't match\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <button\r\n          [disabled]=\"!signupForm.valid\"\r\n          class=\"btn btn-primary btn-signup\"\r\n        >\r\n          Sign Up\r\n        </button>\r\n      </div>\r\n    </form>\r\n    <p class=\"p-bottom\">\r\n      Already have an account? <a [routerLink]=\"['/auth/login']\">Log In</a>\r\n    </p>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/auth/signup/signup.component.scss":
/*!***************************************************!*\
  !*** ./src/app/auth/signup/signup.component.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Roboto|Titillium+Web|Montserrat|Comfortaa|Open+Sans:400,600|Patua+One\");\n* {\n  font-family: \"Open Sans\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Roboto\", sans-serif; }\na {\n  color: #003b71;\n  text-decoration: none; }\na:hover {\n    text-decoration: underline;\n    color: #0056a4; }\nhtml,\nbody {\n  height: 100%; }\nbody {\n  margin: 0;\n  font-family: \"Open Sans\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Roboto\", sans-serif; }\n.invalid-feedback {\n  display: block; }\nlabel {\n  font-size: 0.8rem;\n  text-align: center; }\n.container {\n  position: absolute;\n  max-width: 100%;\n  width: 100%;\n  min-height: calc(100% - 63px - 80px);\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n.content {\n  position: relative;\n  width: 350px;\n  text-align: center; }\n.btn-primary {\n  width: 100%;\n  font-weight: bold;\n  padding: 15px;\n  border-radius: 0;\n  background-color: white;\n  border: 1px solid #003b71;\n  color: black;\n  margin-top: 50px; }\n.btn-primary:disabled {\n    background-color: #ddd; }\n.p-top {\n  margin-bottom: 50px; }\n.p-bottom {\n  margin-top: 50px; }\ninput {\n  border-radius: 0;\n  border: none;\n  border-bottom: 1px solid #ddd;\n  padding: 10px 3px; }\ninput:hover {\n    box-shadow: none;\n    background-color: rgba(72, 149, 185, 0.05); }\ninput:focus {\n    box-shadow: none;\n    background-color: rgba(72, 149, 185, 0.1); }\ninput.invalid {\n    border-bottom: 1px solid #ff6565; }\n.invalid-feedback {\n  text-align: right;\n  position: absolute;\n  margin-top: -28px;\n  left: -360px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aC9zaWdudXAvRDpcXExpYnJhcmllc1xcRG9jdW1lbnRzXFxEb2N1bWVudHNcXEdpdFxcQ1JOTC9zcmNcXHN0eWxlcy5zY3NzIiwic3JjL2FwcC9hdXRoL3NpZ251cC9EOlxcTGlicmFyaWVzXFxEb2N1bWVudHNcXERvY3VtZW50c1xcR2l0XFxDUk5ML3NyY1xcYXBwXFxhdXRoXFxhdXRoLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNEhBQVk7QUFXWjtFQUNFLCtHQVJzQyxFQUFBO0FBV3hDO0VBQ0UsY0FWNkI7RUFXN0IscUJBQXFCLEVBQUE7QUFGdkI7SUFLSSwwQkFBMEI7SUFDMUIsY0FBbUMsRUFBQTtBQUl2Qzs7RUFFRSxZQUFZLEVBQUE7QUFHZDtFQUNFLFNBQVM7RUFDVCwrR0E1QnNDLEVBQUE7QUNGeEM7RUFDRSxjQUFjLEVBQUE7QUFHaEI7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCLEVBQUE7QUFHcEI7RUFDRSxrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFdBQVc7RUFDWCxvQ0FBb0M7RUFFcEMsVUFBVTtFQUNWLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQixFQUFBO0FBR3JCO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixrQkFBa0IsRUFBQTtBQUdwQjtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsYUFBYTtFQUNiLGdCQUFnQjtFQUNoQix1QkFBdUI7RUFDdkIseUJEOUI2QjtFQytCN0IsWUFBWTtFQUNaLGdCQUFnQixFQUFBO0FBUmxCO0lBV0ksc0JBQXNCLEVBQUE7QUFJMUI7RUFDRSxtQkFBbUIsRUFBQTtBQUdyQjtFQUNFLGdCQUFnQixFQUFBO0FBR2xCO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWiw2QkFBNkI7RUFDN0IsaUJBQWlCLEVBQUE7QUFKbkI7SUFPSSxnQkFBZ0I7SUFDaEIsMENBQXNDLEVBQUE7QUFSMUM7SUFZSSxnQkFBZ0I7SUFDaEIseUNBQXNDLEVBQUE7QUFiMUM7SUFpQkksZ0NBQTJDLEVBQUE7QUFJL0M7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9hdXRoL3NpZ251cC9zaWdudXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PVJvYm90b3xUaXRpbGxpdW0rV2VifE1vbnRzZXJyYXR8Q29tZm9ydGFhfE9wZW4rU2Fuczo0MDAsNjAwfFBhdHVhK09uZScpO1xyXG4vLyBAaW1wb3J0ICcuLi9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL3Njc3MvYm9vdHN0cmFwJztcclxuXHJcbiRmb250LWZhbWlseS0xOiAnT3BlbiBTYW5zJywgJ0hlbHZldGljYU5ldWUtTGlnaHQnLCAnSGVsdmV0aWNhIE5ldWUgTGlnaHQnLFxyXG4gICdIZWx2ZXRpY2EgTmV1ZScsICdSb2JvdG8nLCBzYW5zLXNlcmlmO1xyXG5cclxuJGNvbG9yLXByaW1hcnk6IHJnYigwLCA1OSwgMTEzKTtcclxuJGNvbG9yLXNlY29uZGFyeTogcmdiKDE0MiwgMTQ0LCAxNDQpO1xyXG4kY29sb3ItZGFyazogcmdiKDg2LCA5MSwgOTUpO1xyXG4kY29sb3Itc3VwcG9ydDogcmdiKDAsIDEzNCwgMTE3KTtcclxuXHJcbioge1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktMTtcclxufVxyXG5cclxuYSB7XHJcbiAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuXHJcbiAgJjpob3ZlciB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcclxuICAgIGNvbG9yOiBsaWdodGVuKCRjb2xvci1wcmltYXJ5LCAxMCUpO1xyXG4gIH1cclxufVxyXG5cclxuaHRtbCxcclxuYm9keSB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICBtYXJnaW46IDA7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS0xO1xyXG59XHJcbiIsIkBpbXBvcnQgJ3NyYy9zdHlsZXMuc2Nzcyc7XHJcblxyXG4uaW52YWxpZC1mZWVkYmFjayB7XHJcbiAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbmxhYmVsIHtcclxuICBmb250LXNpemU6IDAuOHJlbTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWluLWhlaWdodDogY2FsYygxMDAlIC0gNjNweCAtIDgwcHgpO1xyXG5cclxuICBwYWRkaW5nOiAwO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uY29udGVudCB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gIHdpZHRoOiAzNTBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5idG4tcHJpbWFyeSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgcGFkZGluZzogMTVweDtcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvci1wcmltYXJ5O1xyXG4gIGNvbG9yOiBibGFjaztcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG5cclxuICAmOmRpc2FibGVkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XHJcbiAgfVxyXG59XHJcblxyXG4ucC10b3Age1xyXG4gIG1hcmdpbi1ib3R0b206IDUwcHg7XHJcbn1cclxuXHJcbi5wLWJvdHRvbSB7XHJcbiAgbWFyZ2luLXRvcDogNTBweDtcclxufVxyXG5cclxuaW5wdXQge1xyXG4gIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xyXG4gIHBhZGRpbmc6IDEwcHggM3B4O1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKCRjb2xvcjogIzQ4OTViOSwgJGFscGhhOiAwLjA1KTtcclxuICB9XHJcblxyXG4gICY6Zm9jdXMge1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoJGNvbG9yOiAjNDg5NWI5LCAkYWxwaGE6IDAuMSk7XHJcbiAgfVxyXG5cclxuICAmLmludmFsaWQge1xyXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYigyNTUsIDEwMSwgMTAxKTtcclxuICB9XHJcbn1cclxuXHJcbi5pbnZhbGlkLWZlZWRiYWNrIHtcclxuICB0ZXh0LWFsaWduOiByaWdodDtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgbWFyZ2luLXRvcDogLTI4cHg7XHJcbiAgbGVmdDogLTM2MHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/auth/signup/signup.component.ts":
/*!*************************************************!*\
  !*** ./src/app/auth/signup/signup.component.ts ***!
  \*************************************************/
/*! exports provided: SignupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupComponent", function() { return SignupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupComponent = /** @class */ (function () {
    function SignupComponent(router, formBuilder, auth, route) {
        this.router = router;
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.route = route;
        this.returnUrl = '';
        this.loading = true;
    }
    SignupComponent.prototype.ngOnInit = function () {
        this.signupForm = this.formBuilder.group({
            email: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            full_name: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            major: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            minor: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required],
            password_confirm: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.loading = false;
    };
    SignupComponent.prototype.onSubmit = function (form) {
        if (this.signupForm.invalid) {
            return;
        }
        this.loading = true;
        this.auth.signup(form).subscribe(function (err) {
            console.error(err);
        });
        this.router.navigate(['/auth/login'], {
            queryParams: { returnUrl: this.returnUrl }
        });
    };
    SignupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-signup',
            template: __webpack_require__(/*! ./signup.component.html */ "./src/app/auth/signup/signup.component.html"),
            styles: [__webpack_require__(/*! ./signup.component.scss */ "./src/app/auth/signup/signup.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
            _services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
    ], SignupComponent);
    return SignupComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-content\">\r\n  <div class=\"banner mat-elevation-z3\">\r\n    <h1 class=\"headline\">Compass: The Ultimate Team Experience</h1>\r\n  </div>\r\n  <div class=\"post-create-content\">\r\n    <app-post-create></app-post-create>\r\n  </div>\r\n  <hr />\r\n  <div class=\"post-content\">\r\n    <app-post-list></app-post-list>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Roboto|Titillium+Web|Montserrat|Comfortaa|Open+Sans:400,600|Patua+One\");\n* {\n  font-family: \"Open Sans\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Roboto\", sans-serif; }\na {\n  color: #003b71;\n  text-decoration: none; }\na:hover {\n    text-decoration: underline;\n    color: #0056a4; }\nhtml,\nbody {\n  height: 100%; }\nbody {\n  margin: 0;\n  font-family: \"Open Sans\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Roboto\", sans-serif; }\nhr {\n  width: 80%; }\n.main-content {\n  margin: 0;\n  padding: 0;\n  float: right;\n  width: 100%; }\n.banner {\n  width: 100%;\n  height: 30rem;\n  display: flex;\n  align-items: center;\n  text-align: center;\n  background-color: #0056a4;\n  color: white; }\n.banner .headline {\n    flex: auto;\n    font-family: 'Patua One';\n    letter-spacing: 0.2rem;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    -khtml-user-select: none;\n    -webkit-user-select: none;\n    -webkit-touch-callout: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaG9tZS9EOlxcTGlicmFyaWVzXFxEb2N1bWVudHNcXERvY3VtZW50c1xcR2l0XFxDUk5ML3NyY1xcc3R5bGVzLnNjc3MiLCJzcmMvYXBwL2hvbWUvRDpcXExpYnJhcmllc1xcRG9jdW1lbnRzXFxEb2N1bWVudHNcXEdpdFxcQ1JOTC9zcmNcXGFwcFxcaG9tZVxcaG9tZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0SEFBWTtBQVdaO0VBQ0UsK0dBUnNDLEVBQUE7QUFXeEM7RUFDRSxjQVY2QjtFQVc3QixxQkFBcUIsRUFBQTtBQUZ2QjtJQUtJLDBCQUEwQjtJQUMxQixjQUFtQyxFQUFBO0FBSXZDOztFQUVFLFlBQVksRUFBQTtBQUdkO0VBQ0UsU0FBUztFQUNULCtHQTVCc0MsRUFBQTtBQ0Z4QztFQUNFLFVBQVUsRUFBQTtBQUdaO0VBQ0UsU0FBUztFQUNULFVBQVU7RUFDVixZQUFZO0VBQ1osV0FBVyxFQUFBO0FBR2I7RUFDRSxXQUFXO0VBQ1gsYUFBYTtFQUNiLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsa0JBQWtCO0VBRWxCLHlCQUE4QztFQUM5QyxZQUF5QixFQUFBO0FBUjNCO0lBV0ksVUFBVTtJQUNWLHdCQUF3QjtJQUN4QixzQkFBc0I7SUFFdEIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQix3QkFBd0I7SUFDeEIseUJBQXlCO0lBQ3pCLDJCQUEyQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1Sb2JvdG98VGl0aWxsaXVtK1dlYnxNb250c2VycmF0fENvbWZvcnRhYXxPcGVuK1NhbnM6NDAwLDYwMHxQYXR1YStPbmUnKTtcclxuLy8gQGltcG9ydCAnLi4vbm9kZV9tb2R1bGVzL2Jvb3RzdHJhcC9zY3NzL2Jvb3RzdHJhcCc7XHJcblxyXG4kZm9udC1mYW1pbHktMTogJ09wZW4gU2FucycsICdIZWx2ZXRpY2FOZXVlLUxpZ2h0JywgJ0hlbHZldGljYSBOZXVlIExpZ2h0JyxcclxuICAnSGVsdmV0aWNhIE5ldWUnLCAnUm9ib3RvJywgc2Fucy1zZXJpZjtcclxuXHJcbiRjb2xvci1wcmltYXJ5OiByZ2IoMCwgNTksIDExMyk7XHJcbiRjb2xvci1zZWNvbmRhcnk6IHJnYigxNDIsIDE0NCwgMTQ0KTtcclxuJGNvbG9yLWRhcms6IHJnYig4NiwgOTEsIDk1KTtcclxuJGNvbG9yLXN1cHBvcnQ6IHJnYigwLCAxMzQsIDExNyk7XHJcblxyXG4qIHtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LTE7XHJcbn1cclxuXHJcbmEge1xyXG4gIGNvbG9yOiAkY29sb3ItcHJpbWFyeTtcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XHJcbiAgICBjb2xvcjogbGlnaHRlbigkY29sb3ItcHJpbWFyeSwgMTAlKTtcclxuICB9XHJcbn1cclxuXHJcbmh0bWwsXHJcbmJvZHkge1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHktMTtcclxufVxyXG4iLCJAaW1wb3J0ICdzcmMvc3R5bGVzLnNjc3MnO1xyXG5cclxuaHIge1xyXG4gIHdpZHRoOiA4MCU7XHJcbn1cclxuXHJcbi5tYWluLWNvbnRlbnQge1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG4gIGZsb2F0OiByaWdodDtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmJhbm5lciB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAzMHJlbTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGVuKCRjb2xvci1wcmltYXJ5LCAxMCUpO1xyXG4gIGNvbG9yOiByZ2IoMjU1LCAyNTUsIDI1NSk7XHJcblxyXG4gIC5oZWFkbGluZSB7XHJcbiAgICBmbGV4OiBhdXRvO1xyXG4gICAgZm9udC1mYW1pbHk6ICdQYXR1YSBPbmUnO1xyXG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuMnJlbTtcclxuXHJcbiAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xyXG4gICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcclxuICAgIC13ZWJraXQtdG91Y2gtY2FsbG91dDogbm9uZTtcclxuICB9XHJcbn1cclxuXHJcbi8vIEBtZWRpYShtaW4td2lkdGg6IG1hcC1nZXQoJGdyaWQtYnJlYWtwb2ludHMsIHhzKSkge1xyXG4vLyAgIC5zaWRlLWNvbnRlbnQge1xyXG4vLyAgICAgZGlzcGxheTogbm9uZTtcclxuLy8gICB9XHJcblxyXG4vLyAgIC5tYWluLWNvbnRlbnQge1xyXG4vLyAgICAgd2lkdGg6IDEwMCU7XHJcbi8vICAgfVxyXG4vLyB9XHJcblxyXG4vLyBAbWVkaWEobWluLXdpZHRoOiBtYXAtZ2V0KCRncmlkLWJyZWFrcG9pbnRzLCBtZCkpIHtcclxuLy8gICAuc2lkZS1jb250ZW50IHtcclxuLy8gICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4vLyAgICAgd2lkdGg6IDEwMHB4O1xyXG4vLyAgIH1cclxuXHJcbi8vICAgLm1haW4tY29udGVudCB7XHJcbi8vICAgICB3aWR0aDogY2FsYygxMDAlIC0gMTAwcHgpO1xyXG4vLyAgIH1cclxuLy8gfVxyXG5cclxuLy8gQG1lZGlhKG1pbi13aWR0aDogbWFwLWdldCgkZ3JpZC1icmVha3BvaW50cywgbGcpKSB7XHJcbi8vICAgLnNpZGUtY29udGVudCB7XHJcbi8vICAgICBkaXNwbGF5OiBibG9jaztcclxuLy8gICAgIHdpZHRoOiAyNTBweDtcclxuLy8gICB9XHJcblxyXG4vLyAgIC5tYWluLWNvbnRlbnQge1xyXG4vLyAgICAgd2lkdGg6IGNhbGMoMTAwJSAtIDI1MHB4KTtcclxuLy8gICB9XHJcbi8vIH1cclxuIl19 */"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/posts/post-create/post-create.component.html":
/*!**************************************************************!*\
  !*** ./src/app/posts/post-create/post-create.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"card mat-elevation-z2\">\r\n    <div class=\"card-body\">\r\n      <h5 class=\"card-title\">Create New Post</h5>\r\n      <form\r\n        [formGroup]=\"postCreateForm\"\r\n        (ngSubmit)=\"onFormSubmit(postCreateForm.value)\"\r\n      >\r\n        <div class=\"form-group\">\r\n          <input\r\n            class=\"form-control form-control-lg\"\r\n            type=\"text\"\r\n            placeholder=\"Title\"\r\n            formControlName=\"title\"\r\n          />\r\n        </div>\r\n        <div class=\"form-group\">\r\n          <textarea\r\n            class=\"form-control\"\r\n            placeholder=\"Write your message\"\r\n            rows=\"3\"\r\n            formControlName=\"content\"\r\n          ></textarea>\r\n        </div>\r\n        <button\r\n          type=\"submit\"\r\n          [disabled]=\"!postCreateForm.valid\"\r\n          class=\"btn btn-primary\"\r\n        >\r\n          Submit\r\n        </button>\r\n      </form>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/posts/post-create/post-create.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/posts/post-create/post-create.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  padding: 0;\n  margin: 0;\n  margin-top: -150px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 2rem 0;\n  max-width: 100%; }\n\n.card {\n  width: 40rem; }\n\n.card .card-title {\n    font-family: 'Titillium Web', sans-serif;\n    font-weight: 700; }\n\n.card form {\n    width: 100%; }\n\n.card form textarea {\n      resize: none; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9zdHMvcG9zdC1jcmVhdGUvRDpcXExpYnJhcmllc1xcRG9jdW1lbnRzXFxEb2N1bWVudHNcXEdpdFxcQ1JOTC9zcmNcXGFwcFxccG9zdHNcXHBvc3QtY3JlYXRlXFxwb3N0LWNyZWF0ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1Qsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsbUJBQW1CO0VBQ25CLGVBQWU7RUFDZixlQUFlLEVBQUE7O0FBR2pCO0VBQ0UsWUFBWSxFQUFBOztBQURkO0lBSUksd0NBQXdDO0lBQ3hDLGdCQUFnQixFQUFBOztBQUxwQjtJQVNJLFdBQVcsRUFBQTs7QUFUZjtNQVlNLFlBQVksRUFBQSIsImZpbGUiOiJzcmMvYXBwL3Bvc3RzL3Bvc3QtY3JlYXRlL3Bvc3QtY3JlYXRlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDA7XHJcbiAgbWFyZ2luLXRvcDogLTE1MHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBwYWRkaW5nOiAycmVtIDA7XHJcbiAgbWF4LXdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uY2FyZCB7XHJcbiAgd2lkdGg6IDQwcmVtO1xyXG5cclxuICAuY2FyZC10aXRsZSB7XHJcbiAgICBmb250LWZhbWlseTogJ1RpdGlsbGl1bSBXZWInLCBzYW5zLXNlcmlmO1xyXG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICB9XHJcblxyXG4gIGZvcm0ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcblxyXG4gICAgdGV4dGFyZWEge1xyXG4gICAgICByZXNpemU6IG5vbmU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/posts/post-create/post-create.component.ts":
/*!************************************************************!*\
  !*** ./src/app/posts/post-create/post-create.component.ts ***!
  \************************************************************/
/*! exports provided: PostCreateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostCreateComponent", function() { return PostCreateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PostCreateComponent = /** @class */ (function () {
    function PostCreateComponent(router, api, formBuilder) {
        this.router = router;
        this.api = api;
        this.formBuilder = formBuilder;
    }
    PostCreateComponent.prototype.ngOnInit = function () {
        this.postCreateForm = this.formBuilder.group({
            title: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            content: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
    };
    PostCreateComponent.prototype.onFormSubmit = function (form) {
        this.api.postPost(form).subscribe(function (err) {
            console.error(err);
        });
        this.router.navigate(['']);
    };
    PostCreateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-post-create',
            template: __webpack_require__(/*! ./post-create.component.html */ "./src/app/posts/post-create/post-create.component.html"),
            styles: [__webpack_require__(/*! ./post-create.component.scss */ "./src/app/posts/post-create/post-create.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]])
    ], PostCreateComponent);
    return PostCreateComponent;
}());



/***/ }),

/***/ "./src/app/posts/post-list/post-list.component.html":
/*!**********************************************************!*\
  !*** ./src/app/posts/post-list/post-list.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"card mat-elevation-z1\" *ngFor=\"let post of posts\">\r\n    <div class=\"card-body\">\r\n      <h5 class=\"card-title\">{{ post.title }}</h5>\r\n      <p class=\"card-text\">{{ post.content }}</p>\r\n      <p class=\"card-text\">\r\n        <small class=\"text-muted\">Created at: {{ post.createdAt }}</small>\r\n      </p>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/posts/post-list/post-list.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/posts/post-list/post-list.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  flex-direction: column;\n  padding: 2rem 0;\n  max-width: 100%; }\n\n.card {\n  width: 40rem;\n  margin: 0 0 2rem 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcG9zdHMvcG9zdC1saXN0L0Q6XFxMaWJyYXJpZXNcXERvY3VtZW50c1xcRG9jdW1lbnRzXFxHaXRcXENSTkwvc3JjXFxhcHBcXHBvc3RzXFxwb3N0LWxpc3RcXHBvc3QtbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFVBQVU7RUFDVixTQUFTO0VBQ1QsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsZUFBZTtFQUNmLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsZUFBZSxFQUFBOztBQUdqQjtFQUNFLFlBQVk7RUFDWixrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3Bvc3RzL3Bvc3QtbGlzdC9wb3N0LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyIHtcclxuICBwYWRkaW5nOiAwO1xyXG4gIG1hcmdpbjogMDtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgcGFkZGluZzogMnJlbSAwO1xyXG4gIG1heC13aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmNhcmQge1xyXG4gIHdpZHRoOiA0MHJlbTtcclxuICBtYXJnaW46IDAgMCAycmVtIDA7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/posts/post-list/post-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/posts/post-list/post-list.component.ts ***!
  \********************************************************/
/*! exports provided: PostListComponent, PostDataSource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostListComponent", function() { return PostListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PostDataSource", function() { return PostDataSource; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var _angular_cdk_collections__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/cdk/collections */ "./node_modules/@angular/cdk/esm5/collections.es5.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PostListComponent = /** @class */ (function () {
    function PostListComponent(api) {
        this.api = api;
    }
    PostListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getPosts().subscribe(function (res) {
            _this.posts = res;
        }, function (err) {
            console.error(err);
        });
    };
    PostListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-post-list',
            template: __webpack_require__(/*! ./post-list.component.html */ "./src/app/posts/post-list/post-list.component.html"),
            styles: [__webpack_require__(/*! ./post-list.component.scss */ "./src/app/posts/post-list/post-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], PostListComponent);
    return PostListComponent;
}());

var PostDataSource = /** @class */ (function (_super) {
    __extends(PostDataSource, _super);
    function PostDataSource(api) {
        var _this = _super.call(this) || this;
        _this.api = api;
        return _this;
    }
    PostDataSource.prototype.connect = function () {
        return this.api.getPosts();
    };
    PostDataSource.prototype.disconnect = function () { };
    return PostDataSource;
}(_angular_cdk_collections__WEBPACK_IMPORTED_MODULE_2__["DataSource"]));



/***/ }),

/***/ "./src/app/search-bar/search-bar.component.html":
/*!******************************************************!*\
  !*** ./src/app/search-bar/search-bar.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"search-content\">\r\n  <mat-toolbar color=\"primary\">\r\n    <mat-toolbar-row>\r\n      <span class=\"align-middle\">Refine Search: </span>\r\n\r\n      <mat-form-field>\r\n        <mat-select placeholder=\"Major\" [formControl]=\"majors\" multiple>\r\n          <mat-option *ngFor=\"let major of majorList\" [value]=\"major\">{{\r\n            major\r\n          }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <mat-select placeholder=\"Minor\" [formControl]=\"minors\" multiple>\r\n          <mat-option *ngFor=\"let minor of minorList\" [value]=\"minor\">{{\r\n            minor\r\n          }}</mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n\r\n      <mat-form-field>\r\n        <mat-select placeholder=\"Sort By\">\r\n          <mat-option\r\n            *ngFor=\"let sortOption of sortOptions\"\r\n            [value]=\"sortOption.value\"\r\n          >\r\n            {{ sortOption.viewValue }}\r\n          </mat-option>\r\n        </mat-select>\r\n      </mat-form-field>\r\n    </mat-toolbar-row>\r\n  </mat-toolbar>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/search-bar/search-bar.component.scss":
/*!******************************************************!*\
  !*** ./src/app/search-bar/search-bar.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-form-field {\n  margin-left: 1.5rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2VhcmNoLWJhci9EOlxcTGlicmFyaWVzXFxEb2N1bWVudHNcXERvY3VtZW50c1xcR2l0XFxDUk5ML3NyY1xcYXBwXFxzZWFyY2gtYmFyXFxzZWFyY2gtYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsbUJBQW1CLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZWFyY2gtYmFyL3NlYXJjaC1iYXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJtYXQtZm9ybS1maWVsZCB7XHJcbiAgbWFyZ2luLWxlZnQ6IDEuNXJlbTtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/search-bar/search-bar.component.ts":
/*!****************************************************!*\
  !*** ./src/app/search-bar/search-bar.component.ts ***!
  \****************************************************/
/*! exports provided: SearchBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchBarComponent", function() { return SearchBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent() {
        this.majors = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.majorList = ['Computer Science', 'Information Systems'];
        this.minors = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]();
        this.minorList = [
            'Computational and Simulation Science',
            'Business Process Management',
            'Data-centric Computing Extension',
            'Enterprise Systems',
            'User Experience',
            'Information Systems',
            'Intelligent Systems',
            'Mobile Applications',
            'Networks and Security'
        ];
        this.sortOptions = [
            { value: 'newest', viewValue: 'Newest' },
            { value: 'oldest', viewValue: 'Oldest' },
            { value: 'recommended', viewValue: 'Recommended' }
        ];
    }
    SearchBarComponent.prototype.ngOnInit = function () { };
    SearchBarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-search-bar',
            template: __webpack_require__(/*! ./search-bar.component.html */ "./src/app/search-bar/search-bar.component.html"),
            styles: [__webpack_require__(/*! ./search-bar.component.scss */ "./src/app/search-bar/search-bar.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SearchBarComponent);
    return SearchBarComponent;
}());



/***/ }),

/***/ "./src/app/shared/footer/footer.component.html":
/*!*****************************************************!*\
  !*** ./src/app/shared/footer/footer.component.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\r\n  <div class=\"qut-footer-content\">\r\n    <ul>\r\n      <li>\r\n        <a href=\"https://www.qut.edu.au\" target=\"_blank\">\r\n          <span>QUT Home</span>\r\n        </a>\r\n      </li>\r\n      <li>\r\n        <a\r\n          href=\"https://qutvirtual4.qut.edu.au/group/student/home\"\r\n          target=\"_blank\"\r\n        >\r\n          <span>HiQ</span>\r\n        </a>\r\n      </li>\r\n      <li>\r\n        <a\r\n          href=\"https://qutvirtual4.qut.edu.au/group/staff/home\"\r\n          target=\"_blank\"\r\n        >\r\n          <span>Digital Workplace</span>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</footer>\r\n;\r\n"

/***/ }),

/***/ "./src/app/shared/footer/footer.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/shared/footer/footer.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".footer {\n  position: absolute;\n  bottom: 0;\n  height: 80px;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  justify-items: center;\n  align-items: center; }\n\n.qut-footer-content {\n  text-align: center; }\n\n.qut-footer-content ul {\n    list-style-type: none;\n    padding: 0;\n    margin: 0; }\n\n.qut-footer-content ul li {\n      display: inline-block;\n      margin: 0 1rem; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL2Zvb3Rlci9EOlxcTGlicmFyaWVzXFxEb2N1bWVudHNcXERvY3VtZW50c1xcR2l0XFxDUk5ML3NyY1xcYXBwXFxzaGFyZWRcXGZvb3RlclxcZm9vdGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxZQUFZO0VBQ1osV0FBVztFQUNYLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIscUJBQXFCO0VBQ3JCLG1CQUFtQixFQUFBOztBQUdyQjtFQUNFLGtCQUFrQixFQUFBOztBQURwQjtJQUlJLHFCQUFxQjtJQUNyQixVQUFVO0lBQ1YsU0FBUyxFQUFBOztBQU5iO01BU00scUJBQXFCO01BQ3JCLGNBQWMsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9mb290ZXIvZm9vdGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZvb3RlciB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIGJvdHRvbTogMDtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLnF1dC1mb290ZXItY29udGVudCB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG5cclxuICB1bCB7XHJcbiAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgbWFyZ2luOiAwO1xyXG5cclxuICAgIGxpIHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICBtYXJnaW46IDAgMXJlbTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/shared/footer/footer.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/footer/footer.component.ts ***!
  \***************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () { };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/shared/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/shared/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/shared/loading/loading.component.html":
/*!*******************************************************!*\
  !*** ./src/app/shared/loading/loading.component.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\r\n  loading works!\r\n</p>\r\n"

/***/ }),

/***/ "./src/app/shared/loading/loading.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/shared/loading/loading.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/shared/loading/loading.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/loading/loading.component.ts ***!
  \*****************************************************/
/*! exports provided: LoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingComponent", function() { return LoadingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
    }
    LoadingComponent.prototype.ngOnInit = function () {
    };
    LoadingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-loading',
            template: __webpack_require__(/*! ./loading.component.html */ "./src/app/shared/loading/loading.component.html"),
            styles: [__webpack_require__(/*! ./loading.component.scss */ "./src/app/shared/loading/loading.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LoadingComponent);
    return LoadingComponent;
}());



/***/ }),

/***/ "./src/app/shared/main-nav/main-nav.component.html":
/*!*********************************************************!*\
  !*** ./src/app/shared/main-nav/main-nav.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-md sticky-top mat-elevation-z1\">\r\n  <a class=\"navbar-brand\" [routerLink]=\"['/home']\">\r\n    <img src=\"assets/images/QUT_Logo.PNG\" />\r\n    <span class=\"nav-brand-text\">Compass</span>\r\n  </a>\r\n  <button\r\n    class=\"navbar-toggler hidden-sm-up\"\r\n    type=\"button\"\r\n    (click)=\"isCollapsed = !isCollapsed\"\r\n    data-target=\"#navbarsDefault\"\r\n    aria-controls=\"navbarsDefault\"\r\n    aria-expanded=\"false\"\r\n    aria-label=\"Toggle navigation\"\r\n  >\r\n    <span class=\"navbar-toggler-icon\"></span>\r\n  </button>\r\n  <div\r\n    [ngbCollapse]=\"isCollapsed\"\r\n    class=\"collapse navbar-collapse\"\r\n    id=\"navbarsDefault\"\r\n  >\r\n    <ul class=\"navbar-nav mr-auto\">\r\n      <li class=\"nav-item\">\r\n        <a\r\n          class=\"navbar-link\"\r\n          [routerLink]=\"['/home']\"\r\n          routerLinkActive=\"router-link-active\"\r\n          >Home</a\r\n        >\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a\r\n          class=\"navbar-link\"\r\n          [routerLink]=\"['/users']\"\r\n          routerLinkActive=\"router-link-active\"\r\n          >Users</a\r\n        >\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a\r\n          class=\"navbar-link\"\r\n          [routerLink]=\"['/teams']\"\r\n          routerLinkActive=\"router-link-active\"\r\n          >Teams</a\r\n        >\r\n      </li>\r\n    </ul>\r\n    <ul class=\"navbar-nav\">\r\n      <ng-container *ngIf=\"!isAuthenticated; else elseTemplate\">\r\n        <li class=\"nav-item auth-btn login-btn\">\r\n          <a\r\n            class=\"navbar-link\"\r\n            [routerLink]=\"['/auth/login/']\"\r\n            [queryParams]=\"{ returnUrl: this.router.url }\"\r\n            routerLinkActive=\"router-link-active\"\r\n          >\r\n            Log In\r\n          </a>\r\n        </li>\r\n        <li class=\"nav-item auth-btn signup-btn\">\r\n          <a\r\n            class=\"navbar-link\"\r\n            [routerLink]=\"['/auth/signup/']\"\r\n            [queryParams]=\"{ returnUrl: this.router.url }\"\r\n            routerLinkActive=\"router-link-active\"\r\n            >Sign Up</a\r\n          >\r\n        </li>\r\n      </ng-container>\r\n      <ng-template #elseTemplate>\r\n        <li class=\"nav-item\" *ngIf=\"currentUser.__t == 'Staff'\">\r\n          <a\r\n            class=\"navbar-link\"\r\n            routerLink=\"/staff\"\r\n            routerLinkActive=\"router-link-active\"\r\n          >\r\n            Staff\r\n          </a>\r\n        </li>\r\n        <li class=\"nav-item\">\r\n          <a\r\n            class=\"navbar-link profile-link\"\r\n            routerLink=\"/profile\"\r\n            routerLinkActive=\"router-link-active\"\r\n          >\r\n            Profile\r\n            <small class=\"currentUserName\">({{ currentUser.full_name }})</small>\r\n          </a>\r\n        </li>\r\n        <li class=\"nav-item auth-btn logout-btn\">\r\n          <a class=\"navbar-link\" [routerLink]=\"['/auth/login']\">Sign Out</a>\r\n        </li>\r\n      </ng-template>\r\n    </ul>\r\n  </div>\r\n</nav>\r\n"

/***/ }),

/***/ "./src/app/shared/main-nav/main-nav.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/shared/main-nav/main-nav.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Roboto|Titillium+Web|Montserrat|Comfortaa|Open+Sans:400,600|Patua+One\");\n* {\n  font-family: \"Open Sans\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Roboto\", sans-serif; }\na {\n  color: #003b71;\n  text-decoration: none; }\na:hover {\n    text-decoration: underline;\n    color: #0056a4; }\nhtml,\nbody {\n  height: 100%; }\nbody {\n  margin: 0;\n  font-family: \"Open Sans\", \"HelveticaNeue-Light\", \"Helvetica Neue Light\", \"Helvetica Neue\", \"Roboto\", sans-serif; }\n@media (min-width: 768px) {\n  .navbar {\n    border-top: 4px solid #008675;\n    padding: 8px 18%;\n    font-size: 0.9rem;\n    font-weight: 600; }\n    .navbar .navbar-brand {\n      font-weight: 500;\n      color: #003b71; }\n      .navbar .navbar-brand img {\n        width: 3rem;\n        margin-bottom: 7px; }\n      .navbar .navbar-brand .nav-brand-text {\n        font-weight: bold;\n        font-family: 'Comfortaa'; }\n      .navbar .navbar-brand:after {\n        content: '';\n        display: block;\n        margin: auto;\n        height: 2px;\n        width: 0px;\n        background: transparent;\n        transition: width 0.3s ease, background-color 0.3s ease; }\n      .navbar .navbar-brand:hover:after {\n        width: 75%;\n        background: black; }\n    .navbar .navbar-link {\n      display: block;\n      cursor: pointer;\n      text-decoration: none;\n      color: black;\n      padding: 0.3rem 1rem; }\n      .navbar .navbar-link:after {\n        content: '';\n        display: block;\n        margin: auto;\n        height: 2px;\n        width: 0px;\n        background: transparent;\n        transition: width 0.3s ease, background-color 0.3s ease; }\n      .navbar .navbar-link:hover:after {\n        width: 100%;\n        background: black; }\n      .navbar .navbar-link.router-link-active {\n        color: black;\n        border-bottom: 1px solid #7c7c7c; }\n      .navbar .navbar-link.profile-link:hover {\n        background-color: inherit; }\n    .navbar .auth-btn {\n      font-size: 0.9rem;\n      font-weight: 500; }\n      .navbar .auth-btn.signup-btn {\n        margin-left: 5px; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvc2hhcmVkL21haW4tbmF2L0Q6XFxMaWJyYXJpZXNcXERvY3VtZW50c1xcRG9jdW1lbnRzXFxHaXRcXENSTkwvc3JjXFxzdHlsZXMuc2NzcyIsInNyYy9hcHAvc2hhcmVkL21haW4tbmF2L0Q6XFxMaWJyYXJpZXNcXERvY3VtZW50c1xcRG9jdW1lbnRzXFxHaXRcXENSTkwvc3JjXFxhcHBcXHNoYXJlZFxcbWFpbi1uYXZcXG1haW4tbmF2LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDRIQUFZO0FBV1o7RUFDRSwrR0FSc0MsRUFBQTtBQVd4QztFQUNFLGNBVjZCO0VBVzdCLHFCQUFxQixFQUFBO0FBRnZCO0lBS0ksMEJBQTBCO0lBQzFCLGNBQW1DLEVBQUE7QUFJdkM7O0VBRUUsWUFBWSxFQUFBO0FBR2Q7RUFDRSxTQUFTO0VBQ1QsK0dBNUJzQyxFQUFBO0FDRnhDO0VBQ0U7SUFDRSw2QkRLNEI7SUNKNUIsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixnQkFBZ0IsRUFBQTtJQUpsQjtNQU9JLGdCQUFnQjtNQUNoQixjREx5QixFQUFBO01DSDdCO1FBVU0sV0FBVztRQUNYLGtCQUFrQixFQUFBO01BWHhCO1FBZU0saUJBQWlCO1FBQ2pCLHdCQUF3QixFQUFBO01BaEI5QjtRQW9CTSxXQUFXO1FBQ1gsY0FBYztRQUNkLFlBQVk7UUFDWixXQUFXO1FBQ1gsVUFBVTtRQUNWLHVCQUF1QjtRQUN2Qix1REFBdUQsRUFBQTtNQTFCN0Q7UUE2Qk0sVUFBVTtRQUNWLGlCQUFpQixFQUFBO0lBOUJ2QjtNQW1DSSxjQUFjO01BQ2QsZUFBZTtNQUNmLHFCQUFxQjtNQUNyQixZQUFZO01BQ1osb0JBQW9CLEVBQUE7TUF2Q3hCO1FBMENNLFdBQVc7UUFDWCxjQUFjO1FBQ2QsWUFBWTtRQUNaLFdBQVc7UUFDWCxVQUFVO1FBQ1YsdUJBQXVCO1FBQ3ZCLHVEQUF1RCxFQUFBO01BaEQ3RDtRQW1ETSxXQUFXO1FBQ1gsaUJBQWlCLEVBQUE7TUFwRHZCO1FBNERNLFlBQW1CO1FBQ25CLGdDQUEyQyxFQUFBO01BN0RqRDtRQWlFTSx5QkFBeUIsRUFBQTtJQWpFL0I7TUF1RUksaUJBQWlCO01BQ2pCLGdCQUFnQixFQUFBO01BeEVwQjtRQTJFTSxnQkFBZ0IsRUFBQSxFQUNqQiIsImZpbGUiOiJzcmMvYXBwL3NoYXJlZC9tYWluLW5hdi9tYWluLW5hdi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9Um9ib3RvfFRpdGlsbGl1bStXZWJ8TW9udHNlcnJhdHxDb21mb3J0YWF8T3BlbitTYW5zOjQwMCw2MDB8UGF0dWErT25lJyk7XHJcbi8vIEBpbXBvcnQgJy4uL25vZGVfbW9kdWxlcy9ib290c3RyYXAvc2Nzcy9ib290c3RyYXAnO1xyXG5cclxuJGZvbnQtZmFtaWx5LTE6ICdPcGVuIFNhbnMnLCAnSGVsdmV0aWNhTmV1ZS1MaWdodCcsICdIZWx2ZXRpY2EgTmV1ZSBMaWdodCcsXHJcbiAgJ0hlbHZldGljYSBOZXVlJywgJ1JvYm90bycsIHNhbnMtc2VyaWY7XHJcblxyXG4kY29sb3ItcHJpbWFyeTogcmdiKDAsIDU5LCAxMTMpO1xyXG4kY29sb3Itc2Vjb25kYXJ5OiByZ2IoMTQyLCAxNDQsIDE0NCk7XHJcbiRjb2xvci1kYXJrOiByZ2IoODYsIDkxLCA5NSk7XHJcbiRjb2xvci1zdXBwb3J0OiByZ2IoMCwgMTM0LCAxMTcpO1xyXG5cclxuKiB7XHJcbiAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseS0xO1xyXG59XHJcblxyXG5hIHtcclxuICBjb2xvcjogJGNvbG9yLXByaW1hcnk7XHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgY29sb3I6IGxpZ2h0ZW4oJGNvbG9yLXByaW1hcnksIDEwJSk7XHJcbiAgfVxyXG59XHJcblxyXG5odG1sLFxyXG5ib2R5IHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5LTE7XHJcbn1cclxuIiwiQGltcG9ydCAnc3JjL3N0eWxlcy5zY3NzJztcclxuXHJcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xyXG4gIC5uYXZiYXIge1xyXG4gICAgYm9yZGVyLXRvcDogNHB4IHNvbGlkICRjb2xvci1zdXBwb3J0O1xyXG4gICAgcGFkZGluZzogOHB4IDE4JTtcclxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuXHJcbiAgICAubmF2YmFyLWJyYW5kIHtcclxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgY29sb3I6ICRjb2xvci1wcmltYXJ5O1xyXG4gICAgICBpbWcge1xyXG4gICAgICAgIHdpZHRoOiAzcmVtO1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDdweDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLm5hdi1icmFuZC10ZXh0IHtcclxuICAgICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgICAgICBmb250LWZhbWlseTogJ0NvbWZvcnRhYSc7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICY6YWZ0ZXIge1xyXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICBoZWlnaHQ6IDJweDtcclxuICAgICAgICB3aWR0aDogMHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgIHRyYW5zaXRpb246IHdpZHRoIDAuM3MgZWFzZSwgYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XHJcbiAgICAgIH1cclxuICAgICAgJjpob3ZlcjphZnRlciB7XHJcbiAgICAgICAgd2lkdGg6IDc1JTtcclxuICAgICAgICBiYWNrZ3JvdW5kOiBibGFjaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC5uYXZiYXItbGluayB7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgY29sb3I6IGJsYWNrO1xyXG4gICAgICBwYWRkaW5nOiAwLjNyZW0gMXJlbTtcclxuXHJcbiAgICAgICY6YWZ0ZXIge1xyXG4gICAgICAgIGNvbnRlbnQ6ICcnO1xyXG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICAgIG1hcmdpbjogYXV0bztcclxuICAgICAgICBoZWlnaHQ6IDJweDtcclxuICAgICAgICB3aWR0aDogMHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xyXG4gICAgICAgIHRyYW5zaXRpb246IHdpZHRoIDAuM3MgZWFzZSwgYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XHJcbiAgICAgIH1cclxuICAgICAgJjpob3ZlcjphZnRlciB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgYmFja2dyb3VuZDogYmxhY2s7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vICY6aG92ZXIge1xyXG4gICAgICAvLyAgIGJhY2tncm91bmQtY29sb3I6ICNkZWRlZGU7XHJcbiAgICAgIC8vIH1cclxuXHJcbiAgICAgICYucm91dGVyLWxpbmstYWN0aXZlIHtcclxuICAgICAgICBjb2xvcjogcmdiKDAsIDAsIDApO1xyXG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2IoMTI0LCAxMjQsIDEyNCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICYucHJvZmlsZS1saW5rOmhvdmVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xyXG4gICAgICAgIC8vIGNvbG9yOiByZ2IoMTEwLCAxMTAsIDExMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuYXV0aC1idG4ge1xyXG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuXHJcbiAgICAgICYuc2lnbnVwLWJ0biB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/shared/main-nav/main-nav.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared/main-nav/main-nav.component.ts ***!
  \*******************************************************/
/*! exports provided: MainNavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainNavComponent", function() { return MainNavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/auth.service */ "./src/app/_services/auth.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MainNavComponent = /** @class */ (function () {
    function MainNavComponent(breakpointObserver, auth, router) {
        this.breakpointObserver = breakpointObserver;
        this.auth = auth;
        this.router = router;
        this.isCollapsed = true;
        this.currentUser = {
            email: '',
            full_name: '',
            __t: ''
        };
        this.isHandset$ = this.breakpointObserver
            .observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["Breakpoints"].Handset)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (result) { return result.matches; }));
    }
    MainNavComponent.prototype.signupRedirect = function () { };
    Object.defineProperty(MainNavComponent.prototype, "isAuthenticated", {
        get: function () {
            return this.auth.isAuthenticated;
        },
        enumerable: true,
        configurable: true
    });
    MainNavComponent.prototype.profileRedirect = function () {
        this.router.navigate(['/profile']);
    };
    MainNavComponent.prototype.ngOnInit = function () {
        if (this.auth.isAuthenticated) {
            this.currentUser = this.auth.currentUser;
        }
    };
    MainNavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main-nav',
            template: __webpack_require__(/*! ./main-nav.component.html */ "./src/app/shared/main-nav/main-nav.component.html"),
            styles: [__webpack_require__(/*! ./main-nav.component.scss */ "./src/app/shared/main-nav/main-nav.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_1__["BreakpointObserver"],
            src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]])
    ], MainNavComponent);
    return MainNavComponent;
}());



/***/ }),

/***/ "./src/app/teams/team-list/team-list.component.html":
/*!**********************************************************!*\
  !*** ./src/app/teams/team-list/team-list.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <table\r\n    mat-table\r\n    [dataSource]=\"teams\"\r\n    class=\"team-table mat-elevation-z2\"\r\n    matSort\r\n  >\r\n    <!-- Name Column -->\r\n    <ng-container matColumnDef=\"team-name\">\r\n      <th mat-header-cell *matHeaderCellDef width=\"25%\">Team Name</th>\r\n      <td mat-cell *matCellDef=\"let row\">{{ row.name }}</td>\r\n    </ng-container>\r\n\r\n    <!-- Bio Column -->\r\n    <ng-container matColumnDef=\"team-bio\">\r\n      <th mat-header-cell *matHeaderCellDef width=\"50%\">Team Bio</th>\r\n      <td mat-cell *matCellDef=\"let row\">{{ row.bio }}</td>\r\n    </ng-container>\r\n\r\n    <!-- Members Column -->\r\n    <ng-container matColumnDef=\"members\" class=\"member-col\">\r\n      <th mat-header-cell *matHeaderCellDef width=\"25%\">Members</th>\r\n      <td mat-cell *matCellDef=\"let row\">\r\n        <ul>\r\n          <li *ngFor=\"let userId of row.members\">\r\n            <span class=\"userId\">\r\n              {{ val }}\r\n            </span>\r\n          </li>\r\n        </ul>\r\n      </td>\r\n    </ng-container>\r\n\r\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n    <tr\r\n      mat-row\r\n      class=\"team-row\"\r\n      *matRowDef=\"let row; columns: displayedColumns\"\r\n    ></tr>\r\n  </table>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/teams/team-list/team-list.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/teams/team-list/team-list.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  padding-top: 5rem; }\n\n.team-table {\n  width: 750px;\n  border-radius: 10px;\n  overflow: hidden; }\n\n.team-table .team-row {\n    cursor: pointer;\n    height: 60px; }\n\n.team-table .team-row:hover {\n      background-color: rgba(85, 134, 56, 0.1); }\n\n.team-table ul {\n    text-decoration: none;\n    list-style: none;\n    margin: 0;\n    padding: 0; }\n\n.team-table ul li {\n      margin: 0;\n      padding: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVhbXMvdGVhbS1saXN0L0Q6XFxMaWJyYXJpZXNcXERvY3VtZW50c1xcRG9jdW1lbnRzXFxHaXRcXENSTkwvc3JjXFxhcHBcXHRlYW1zXFx0ZWFtLWxpc3RcXHRlYW0tbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSxZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLGdCQUFnQixFQUFBOztBQUhsQjtJQU1JLGVBQWU7SUFDZixZQUFZLEVBQUE7O0FBUGhCO01BVU0sd0NBQXdDLEVBQUE7O0FBVjlDO0lBZUkscUJBQXFCO0lBQ3JCLGdCQUFnQjtJQUNoQixTQUFTO0lBQ1QsVUFBVSxFQUFBOztBQWxCZDtNQW9CTSxTQUFTO01BQ1QsVUFBVSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvdGVhbXMvdGVhbS1saXN0L3RlYW0tbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIHBhZGRpbmctdG9wOiA1cmVtO1xyXG59XHJcblxyXG4udGVhbS10YWJsZSB7XHJcbiAgd2lkdGg6IDc1MHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgLnRlYW0tcm93IHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIGhlaWdodDogNjBweDtcclxuXHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4NSwgMTM0LCA1NiwgMC4xKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVsIHtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGxpc3Qtc3R5bGU6IG5vbmU7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gICAgbGkge1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIHBhZGRpbmc6IDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/teams/team-list/team-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/teams/team-list/team-list.component.ts ***!
  \********************************************************/
/*! exports provided: TeamListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamListComponent", function() { return TeamListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TeamListComponent = /** @class */ (function () {
    function TeamListComponent(api) {
        this.api = api;
        this.displayedColumns = ['team-name', 'team-bio', 'members'];
        this.val = '';
    }
    TeamListComponent.prototype.getNameOfUser = function (userId) {
        console.log('hey');
        return this.api.getUser(userId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (user) {
            console.log('sup');
            user.full_name;
        }));
    };
    TeamListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getTeams().subscribe(function (res) {
            _this.teams = res;
        });
    };
    TeamListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-list',
            template: __webpack_require__(/*! ./team-list.component.html */ "./src/app/teams/team-list/team-list.component.html"),
            styles: [__webpack_require__(/*! ./team-list.component.scss */ "./src/app/teams/team-list/team-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], TeamListComponent);
    return TeamListComponent;
}());



/***/ }),

/***/ "./src/app/teams/team-profile/team-profile.component.html":
/*!****************************************************************!*\
  !*** ./src/app/teams/team-profile/team-profile.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"loading; else elseTemplate\">\r\n  <app-loading></app-loading>\r\n</ng-container>\r\n<ng-template #elseTemplate>\r\n  <div class=\"container\">\r\n    <h2>Members</h2>\r\n    <ul>\r\n      <li *ngFor=\"let member of members\">\r\n        {{ member.full_name }}\r\n        <a\r\n          href=\"javascript:void(0);\"\r\n          class=\"link\"\r\n          (click)=\"removeUser(member._id)\"\r\n          >Remove User</a\r\n        >\r\n      </li>\r\n    </ul>\r\n\r\n    <ul>\r\n      <a href=\"javascript:void(0);\" (click)=\"leaveTeam()\">\r\n        <li>Leave Team</li>\r\n      </a>\r\n      <a href=\"javascript:void(0);\" (click)=\"deleteTeam()\">\r\n        <li>Delete Team</li>\r\n      </a>\r\n    </ul>\r\n  </div>\r\n</ng-template>\r\n"

/***/ }),

/***/ "./src/app/teams/team-profile/team-profile.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/teams/team-profile/team-profile.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".link {\n  cursor: pointer;\n  color: #0c72e7; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdGVhbXMvdGVhbS1wcm9maWxlL0Q6XFxMaWJyYXJpZXNcXERvY3VtZW50c1xcRG9jdW1lbnRzXFxHaXRcXENSTkwvc3JjXFxhcHBcXHRlYW1zXFx0ZWFtLXByb2ZpbGVcXHRlYW0tcHJvZmlsZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQWU7RUFDZixjQUF3QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvdGVhbXMvdGVhbS1wcm9maWxlL3RlYW0tcHJvZmlsZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5saW5rIHtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgY29sb3I6IHJnYigxMiwgMTE0LCAyMzEpO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/teams/team-profile/team-profile.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/teams/team-profile/team-profile.component.ts ***!
  \**************************************************************/
/*! exports provided: TeamProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamProfileComponent", function() { return TeamProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TeamProfileComponent = /** @class */ (function () {
    function TeamProfileComponent(api, auth, router, route) {
        this.api = api;
        this.auth = auth;
        this.router = router;
        this.route = route;
        this.loading = true;
        this.teamId = this.route.snapshot.params['id'];
        this.members = {};
    }
    TeamProfileComponent.prototype.leaveTeam = function () {
        var currentUserId = this.auth.currentUserId;
        this.api.removeFromTeam(this.teamId, currentUserId);
    };
    TeamProfileComponent.prototype.deleteTeam = function () {
        this.api.deleteTeam(this.teamId).subscribe(function (err) {
            console.warn(err);
        });
        this.router.navigateByUrl('/teams/');
        window.location.reload();
    };
    TeamProfileComponent.prototype.getMembers = function () {
        var _this = this;
        this.api.getMembersOfTeam(this.teamId).subscribe(function (data) {
            _this.members = data;
            _this.loading = false;
        });
    };
    TeamProfileComponent.prototype.removeUser = function (userId) {
        this.api.removeFromTeam(this.teamId, userId).subscribe(function (err) {
            console.error(err);
        });
        window.location.reload();
    };
    TeamProfileComponent.prototype.ngOnInit = function () {
        this.getMembers();
    };
    TeamProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-team-profile',
            template: __webpack_require__(/*! ./team-profile.component.html */ "./src/app/teams/team-profile/team-profile.component.html"),
            styles: [__webpack_require__(/*! ./team-profile.component.scss */ "./src/app/teams/team-profile/team-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
    ], TeamProfileComponent);
    return TeamProfileComponent;
}());



/***/ }),

/***/ "./src/app/users/user-list/user-list.component.html":
/*!**********************************************************!*\
  !*** ./src/app/users/user-list/user-list.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <div class=\"card mat-elevation-z2\" *ngFor=\"let student of users\">\r\n    <div class=\"card-body\">\r\n      <div class=\"col\">\r\n        <a routerLink=\"/users/{{ student._id }}\" class=\"card-title\">\r\n          {{ student.full_name }}\r\n          <fa-icon [icon]=\"['fas', 'circle']\" [classes]=\"['circle-class']\" size=\"xs\"></fa-icon>\r\n        </a>\r\n        <p class=\"card-text major\">{{ student.major }}</p>\r\n        <p class=\"card-text minor\">Minors: {{ student.minor }}</p>\r\n      </div>\r\n\r\n      <div ngbDropdown class=\"btn-group dropright menu-buttons\">\r\n        <button\r\n          class=\"btn btn-menu dropdown-toggle\"\r\n          id=\"menuDropdown\"\r\n          ngbDropdownToggle\r\n        >\r\n          <i class=\"fa fa-ellipsis-v fa-2x\"></i>\r\n        </button>\r\n        <div\r\n          ngbDropdownMenu\r\n          aria-labelledby=\"menuDropdown\"\r\n          class=\"dropdown-menu\"\r\n        >\r\n          <ul>\r\n            <li>\r\n              <button routerLink=\"/users/{{ student._id }}\">\r\n                Student Profile\r\n              </button>\r\n            </li>\r\n            <li *ngIf=\"!this.inTeam\">\r\n              <button ngbDropdownItem>Add to team</button>\r\n            </li>\r\n            <li><button ngbDropdownItem>Create Team</button></li>\r\n            <li *ngIf=\"this.inTeam && this.inSameTeam\">\r\n              <button ngbDropdownItem>Remove from team</button>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-footer\">\r\n      <ul class=\"tags\">\r\n        <li class=\"tag\" style=\"background-color:#00A981;\">\r\n          <a style=\"color:white;\" href=\"javascript:void(0);\">c#</a>\r\n        </li>\r\n        <li class=\"tag\" style=\"background-color:rgb(199, 199, 55);\">\r\n          <a style=\"color:black;\" href=\"javascript:void(0);\">java</a>\r\n        </li>\r\n        <li class=\"tag\" style=\"background-color:#DF2020;\">\r\n          <a style=\"color:black;\" href=\"javascript:void(0);\">typescript</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/users/user-list/user-list.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/users/user-list/user-list.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Titillium+Web\");\n.container {\n  padding: 0;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n  flex-direction: column;\n  padding: 2rem 0;\n  max-width: 100%; }\n.card {\n  width: 526px;\n  height: 187px;\n  padding: 0;\n  background: #ffffff;\n  border-radius: 0;\n  justify-items: center; }\n.card + .card {\n    margin-top: 25px; }\n.card .col {\n    padding: 0; }\n.card .card-title {\n    font-style: normal;\n    font-weight: bold;\n    line-height: normal;\n    font-size: 1.5rem;\n    -webkit-text-decoration-color: black;\n            text-decoration-color: black;\n    margin-bottom: 5px;\n    color: #000000; }\n.card fa-icon {\n    font-size: 0.3rem;\n    vertical-align: middle;\n    display: inline-block;\n    color: rgba(20, 120, 20, 0.7); }\n.card .major {\n    font-size: 1rem;\n    margin-bottom: 0;\n    font-weight: 500;\n    color: #000000; }\n.card .minor {\n    font-size: 0.8rem;\n    color: #494949; }\n.card .menu-buttons {\n    position: absolute;\n    margin: 0;\n    top: 10px;\n    right: 10px; }\n.card .menu-buttons > button {\n      width: 40px;\n      height: 40px;\n      border-radius: 0;\n      margin: 0;\n      background-color: rgba(0, 0, 0, 0);\n      color: #555;\n      cursor: pointer; }\n.card .menu-buttons > button::after {\n        border: none;\n        content: none; }\n.card .menu-buttons > button:hover {\n        background-color: rgba(0, 0, 0, 0.1); }\n.card .menu-buttons > button:focus {\n        background-color: rgba(0, 0, 0, 0.15);\n        outline: none;\n        box-shadow: none; }\n.card .menu-buttons .dropdown-menu {\n      padding: 0; }\n.card .menu-buttons .dropdown-menu ul {\n        list-style: none;\n        margin: 0;\n        padding: 0; }\n.card .menu-buttons .dropdown-menu ul li {\n          list-style: none;\n          width: 100%; }\n.card .menu-buttons .dropdown-menu button {\n        border: none;\n        padding: 0;\n        outline: none;\n        background-color: #fff;\n        min-width: 100%;\n        padding: 3px;\n        padding-left: 8px;\n        text-align: left; }\n.card .menu-buttons .dropdown-menu button:hover {\n          background-color: rgba(0, 0, 0, 0.25); }\n.card .card-footer {\n    background: none;\n    border: none;\n    padding-top: 0; }\n.card .card-footer .tags {\n      list-style: none;\n      padding: 0;\n      margin: 0; }\n.card .card-footer .tags .tag {\n        float: left;\n        padding: 1px 8px;\n        border-radius: 2px; }\n.card .card-footer .tags .tag + .tag {\n          margin-left: 5px; }\n.card .card-footer .tags .tag a {\n          font-family: 'Titillium Web', sans-serif;\n          font-style: normal;\n          font-weight: 600;\n          line-height: normal;\n          font-size: 16px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvdXNlcnMvdXNlci1saXN0L0Q6XFxMaWJyYXJpZXNcXERvY3VtZW50c1xcRG9jdW1lbnRzXFxHaXRcXENSTkwvc3JjXFxhcHBcXHVzZXJzXFx1c2VyLWxpc3RcXHVzZXItbGlzdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvRUFBWTtBQUVaO0VBQ0UsVUFBVTtFQUNWLFNBQVM7RUFDVCxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2Ysc0JBQXNCO0VBQ3RCLGVBQWU7RUFDZixlQUFlLEVBQUE7QUFLakI7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLFVBQVU7RUFDVixtQkFBbUI7RUFDbkIsZ0JBQWdCO0VBQ2hCLHFCQUFxQixFQUFBO0FBTnZCO0lBVUksZ0JBQWdCLEVBQUE7QUFWcEI7SUFjSSxVQUFVLEVBQUE7QUFkZDtJQWtCSSxrQkFBa0I7SUFDbEIsaUJBQWlCO0lBQ2pCLG1CQUFtQjtJQUNuQixpQkFBaUI7SUFDakIsb0NBQTRCO1lBQTVCLDRCQUE0QjtJQUM1QixrQkFBa0I7SUFFbEIsY0FBYyxFQUFBO0FBekJsQjtJQTZCSSxpQkFBaUI7SUFDakIsc0JBQXNCO0lBQ3RCLHFCQUFxQjtJQUNyQiw2QkFBNkIsRUFBQTtBQWhDakM7SUFvQ0ksZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixnQkFBZ0I7SUFDaEIsY0FBYyxFQUFBO0FBdkNsQjtJQTJDSSxpQkFBaUI7SUFDakIsY0FBYyxFQUFBO0FBNUNsQjtJQWdESSxrQkFBa0I7SUFDbEIsU0FBUztJQUNULFNBQVM7SUFDVCxXQUFXLEVBQUE7QUFuRGY7TUFzRE0sV0FBVztNQUNYLFlBQVk7TUFDWixnQkFBZ0I7TUFDaEIsU0FBUztNQUNULGtDQUFrQztNQUNsQyxXQUFXO01BQ1gsZUFBZSxFQUFBO0FBNURyQjtRQStEUSxZQUFZO1FBQ1osYUFBYSxFQUFBO0FBaEVyQjtRQW9FUSxvQ0FBb0MsRUFBQTtBQXBFNUM7UUF3RVEscUNBQXFDO1FBQ3JDLGFBQWE7UUFDYixnQkFBZ0IsRUFBQTtBQTFFeEI7TUErRU0sVUFBVSxFQUFBO0FBL0VoQjtRQWtGUSxnQkFBZ0I7UUFDaEIsU0FBUztRQUNULFVBQVUsRUFBQTtBQXBGbEI7VUF1RlUsZ0JBQWdCO1VBQ2hCLFdBQVcsRUFBQTtBQXhGckI7UUE2RlEsWUFBWTtRQUNaLFVBQVU7UUFDVixhQUFhO1FBQ2Isc0JBQXNCO1FBQ3RCLGVBQWU7UUFDZixZQUFZO1FBQ1osaUJBQWlCO1FBQ2pCLGdCQUFnQixFQUFBO0FBcEd4QjtVQXVHVSxxQ0FBcUMsRUFBQTtBQXZHL0M7SUE2R0ksZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixjQUFjLEVBQUE7QUEvR2xCO01Ba0hNLGdCQUFnQjtNQUNoQixVQUFVO01BQ1YsU0FBUyxFQUFBO0FBcEhmO1FBdUhRLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsa0JBQWtCLEVBQUE7QUF6SDFCO1VBNEhVLGdCQUFnQixFQUFBO0FBNUgxQjtVQWdJVSx3Q0FBd0M7VUFDeEMsa0JBQWtCO1VBQ2xCLGdCQUFnQjtVQUNoQixtQkFBbUI7VUFDbkIsZUFBZSxFQUFBIiwiZmlsZSI6InNyYy9hcHAvdXNlcnMvdXNlci1saXN0L3VzZXItbGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9VGl0aWxsaXVtK1dlYicpO1xyXG5cclxuLmNvbnRhaW5lciB7XHJcbiAgcGFkZGluZzogMDtcclxuICBtYXJnaW46IDA7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGZsZXgtd3JhcDogd3JhcDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIHBhZGRpbmc6IDJyZW0gMDtcclxuICBtYXgtd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcblxyXG5cclxuLmNhcmQge1xyXG4gIHdpZHRoOiA1MjZweDtcclxuICBoZWlnaHQ6IDE4N3B4O1xyXG4gIHBhZGRpbmc6IDA7XHJcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcclxuICBib3JkZXItcmFkaXVzOiAwO1xyXG4gIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgLy8gQ3JlYXRlIHNwYWNlIGJldHdlZW4gY2FyZHNcclxuICArIC5jYXJkIHtcclxuICAgIG1hcmdpbi10b3A6IDI1cHg7XHJcbiAgfVxyXG5cclxuICAuY29sIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG5cclxuICAuY2FyZC10aXRsZSB7XHJcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIHRleHQtZGVjb3JhdGlvbi1jb2xvcjogYmxhY2s7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcblxyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgfVxyXG5cclxuICBmYS1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogMC4zcmVtO1xyXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGNvbG9yOiByZ2JhKDIwLCAxMjAsIDIwLCAwLjcpO1xyXG4gIH1cclxuXHJcbiAgLm1ham9yIHtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgIG1hcmdpbi1ib3R0b206IDA7XHJcbiAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgY29sb3I6ICMwMDAwMDA7XHJcbiAgfVxyXG5cclxuICAubWlub3Ige1xyXG4gICAgZm9udC1zaXplOiAwLjhyZW07XHJcbiAgICBjb2xvcjogIzQ5NDk0OTtcclxuICB9XHJcblxyXG4gIC5tZW51LWJ1dHRvbnMge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgdG9wOiAxMHB4O1xyXG4gICAgcmlnaHQ6IDEwcHg7XHJcblxyXG4gICAgPiBidXR0b24ge1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgICAgaGVpZ2h0OiA0MHB4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgICBtYXJnaW46IDA7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMCk7XHJcbiAgICAgIGNvbG9yOiAjNTU1O1xyXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG4gICAgICAmOjphZnRlciB7XHJcbiAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgIGNvbnRlbnQ6IG5vbmU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgICY6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJjpmb2N1cyB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICAgICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICAgIGJveC1zaGFkb3c6IG5vbmU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuZHJvcGRvd24tbWVudSB7XHJcbiAgICAgIHBhZGRpbmc6IDA7XHJcblxyXG4gICAgICB1bCB7XHJcbiAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgcGFkZGluZzogMDtcclxuXHJcbiAgICAgICAgbGkge1xyXG4gICAgICAgICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgYnV0dG9uIHtcclxuICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgICAgcGFkZGluZzogMDtcclxuICAgICAgICBvdXRsaW5lOiBub25lO1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgICAgbWluLXdpZHRoOiAxMDAlO1xyXG4gICAgICAgIHBhZGRpbmc6IDNweDtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDhweDtcclxuICAgICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG5cclxuICAgICAgICAmOmhvdmVyIHtcclxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIC5jYXJkLWZvb3RlciB7XHJcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgcGFkZGluZy10b3A6IDA7XHJcblxyXG4gICAgLnRhZ3Mge1xyXG4gICAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICBtYXJnaW46IDA7XHJcblxyXG4gICAgICAudGFnIHtcclxuICAgICAgICBmbG9hdDogbGVmdDtcclxuICAgICAgICBwYWRkaW5nOiAxcHggOHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDJweDtcclxuXHJcbiAgICAgICAgKyAudGFnIHtcclxuICAgICAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhIHtcclxuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnVGl0aWxsaXVtIFdlYicsIHNhbnMtc2VyaWY7XHJcbiAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/users/user-list/user-list.component.ts":
/*!********************************************************!*\
  !*** ./src/app/users/user-list/user-list.component.ts ***!
  \********************************************************/
/*! exports provided: UserListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserListComponent", function() { return UserListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../_services/api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "./node_modules/@ng-bootstrap/ng-bootstrap/fesm5/ng-bootstrap.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserListComponent = /** @class */ (function () {
    function UserListComponent(api, config) {
        this.api = api;
        this.config = config;
        config.placement = 'right-top';
        config.autoClose = true;
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getStudents().subscribe(function (res) {
            _this.users = res;
        }, function (err) {
            console.error(err);
        });
    };
    UserListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-list',
            template: __webpack_require__(/*! ./user-list.component.html */ "./src/app/users/user-list/user-list.component.html"),
            styles: [__webpack_require__(/*! ./user-list.component.scss */ "./src/app/users/user-list/user-list.component.scss")]
        }),
        __metadata("design:paramtypes", [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"], _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_2__["NgbDropdownConfig"]])
    ], UserListComponent);
    return UserListComponent;
}());



/***/ }),

/***/ "./src/app/users/user-profile/user-profile.component.html":
/*!****************************************************************!*\
  !*** ./src/app/users/user-profile/user-profile.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"isLoaded\" class=\"container\">\r\n  <ul>\r\n    <li>{{ user.email }}</li>\r\n    <li>{{ user.full_name }}</li>\r\n    <li>{{ this.userId }}</li>\r\n    <li *ngIf=\"!this.isSelf && !this.inTeam\">\r\n      <a (click)=\"createTeam()\" href=\"javascript:void(0);\">\r\n        Create team with {{ user.full_name }}\r\n      </a>\r\n    </li>\r\n    <li *ngIf=\"!this.isSelf && !this.inTeam\">\r\n      <a (click)=\"addToTeam()\" href=\"javascript:void(0);\">\r\n        Invite {{ user.full_name }} to team\r\n      </a>\r\n    </li>\r\n    <li *ngIf=\"!this.isSelf && this.sameTeam()\">\r\n      <a (click)=\"removeFromTeam()\" href=\"\">\r\n        Remove from team\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/users/user-profile/user-profile.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/users/user-profile/user-profile.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3VzZXJzL3VzZXItcHJvZmlsZS91c2VyLXByb2ZpbGUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/users/user-profile/user-profile.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/users/user-profile/user-profile.component.ts ***!
  \**************************************************************/
/*! exports provided: UserProfileComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProfileComponent", function() { return UserProfileComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/auth.service */ "./src/app/_services/auth.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(route, router, api, auth) {
        this.route = route;
        this.router = router;
        this.api = api;
        this.auth = auth;
        // Variables
        this.isLoaded = false;
        this.isSelf = false;
        this.inTeam = false;
        this.userId = undefined;
        this.currentUserId = undefined;
        this.currentUserTeamId = undefined;
        // Placeholder user object
        // Overwritten with getUserDetails()
        this.user = {
            email: '',
            full_name: ''
        };
    }
    // Retrieves data of visible user
    UserProfileComponent.prototype.getUserDetails = function () {
        var _this = this;
        this.api.getUser(this.userId).subscribe(function (data) {
            _this.user = data;
            _this.isLoaded = true;
        });
    };
    UserProfileComponent.prototype.sameTeam = function () {
        if (!this.auth.isSelf(this.userId)) {
            return (this.api.getTeamIdFromUser(this.userId()) ==
                this.api.getTeamIdFromUser(this.auth.currentUserId));
        }
    };
    UserProfileComponent.prototype.createTeam = function () {
        var _this = this;
        var user_id = this.userId;
        var logged_id = this.auth.currentUserId;
        if (this.sameTeam()) {
            console.warn('Students are on the same team');
            return;
        }
        else if (this.inTeam || this.currentUserTeamId != undefined) {
            console.warn('One or more students are already in a team');
            return;
        }
        else {
            var data = [user_id, logged_id];
            this.api.createTeam(data).subscribe(function (team) {
                var teamId = team._id;
                _this.router.navigate(["/teams/" + teamId]);
            });
        }
    };
    UserProfileComponent.prototype.addToTeam = function () {
        var userId = this.userId();
        var currentId = this.auth.currentUserId;
        if (!this.api.isInTeam(currentId)) {
            console.warn('Current user is not in a team');
            return;
        }
        else if (this.sameTeam()) {
            console.warn('User already in team');
            return;
        }
        else {
            this.api.addToTeam(userId).subscribe(function (err) {
                console.error(err);
            });
        }
    };
    UserProfileComponent.prototype.removeFromTeam = function () {
        // TODO: Warning if removing user will delete team (only self left in team)
        var teamId = '' + this.api.getTeamIdFromUser(this.userId);
        this.api.removeFromTeam(teamId, this.userId);
        window.location.reload();
    };
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.route.snapshot.data.self === true) {
            this.userId = this.auth.currentUserId;
        }
        else {
            this.userId = this.route.snapshot.params['id'];
            this.currentUserId = this.auth.currentUserId;
            this.api.getUser(this.userId).subscribe(function (user) {
                _this.inTeam = user.team != undefined;
            });
            this.api.getTeamIdFromUser(this.currentUserId).subscribe(function (teamId) {
                _this.currentUserTeamId = teamId;
            });
        }
        this.isSelf = this.auth.isSelf(this.userId);
        this.getUserDetails();
    };
    UserProfileComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user-profile',
            template: __webpack_require__(/*! ./user-profile.component.html */ "./src/app/users/user-profile/user-profile.component.html"),
            styles: [__webpack_require__(/*! ./user-profile.component.scss */ "./src/app/users/user-profile/user-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            src_app_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"],
            src_app_services_auth_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"]])
    ], UserProfileComponent);
    return UserProfileComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Libraries\Documents\Documents\Git\CRNL\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map