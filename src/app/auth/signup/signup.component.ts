import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  closeResult: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private modalService: NgbModal
  ) {}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: [null, Validators.required],
      full_name: [null, Validators.required],
      major: [null, Validators.required],
      minor: [null, Validators.required],
      password: [null, Validators.required],
      password_confirm: [null, Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    this.auth.signup(form).subscribe(err => {
      console.log(err);
    });
    this.router.navigate(['auth/login']);
  }
}
