import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

import Team from '../../_models/Team.js';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrls: ['./team-profile.component.scss']
})
export class TeamProfileComponent implements OnInit {
  constructor(
    private api: ApiService,
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  loading = true;
  error = null;
  editMode = false;

  faPen = faPen;
  faCheck = faCheck;

  teamId = this.route.snapshot.params['id'];
  team: Team;
  members: any[];
  currentUserInTeam: boolean;
  teamForm: FormGroup;

  handleError(err) {
    if (err['status'] == 404) {
      this.error = err;
      this.loading = false;
      setTimeout(
        function() {
          this.router.navigateByUrl('/teams');
        }.bind(this),
        5000
      );
    }
  }

  leaveTeam() {
    const currentUserId = this.auth.currentUserId;
    this.api.removeFromTeam(this.teamId, currentUserId);
  }

  deleteTeam() {
    this.api.deleteTeam(this.teamId).subscribe(err => {
      console.warn(err);
    });
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['/teams']));
  }

  getMembers() {
    this.api.getMembersOfTeam(this.teamId).subscribe(
      res => {
        this.members = Object.values(res);

        this.currentUserInTeam =
          this.members.find(x => x._id == this.auth.currentUserId) != undefined;

        this.loading = false;
      },
      err => {
        this.handleError(err);
      }
    );
  }

  removeUser(userId: any | string | number) {
    if (Object.keys(this.members).length <= 1) {
      if (confirm('Removing this member will delete the team. Continue?')) {
        this.deleteTeam();
      }
    } else {
      this.api.removeFromTeam(this.teamId, userId).subscribe(err => {
        console.warn(err);
      });
      window.location.reload();
    }
  }

  formSubmit() {
    const name = this.teamForm.value.name;

    this.api.updateTeam(this.teamId, { name }).subscribe(data => {
      console.log(data);
    });

    this.team.name = name;

    this.editMode = false;
  }

  ngOnInit() {
    this.getMembers();
    this.api.getTeam(this.teamId).subscribe(res => {
      this.team = res;
      this.teamForm = new FormGroup({
        name: new FormControl(this.team.name)
      });
    });
  }
}
