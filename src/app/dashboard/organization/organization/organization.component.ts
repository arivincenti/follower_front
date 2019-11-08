import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit
{

  constructor(
    private router: Router
  ) { }

  ngOnInit()
  {

  }

  createOrganization()
  {
    this.router.navigate(['app/organizations/create']);
  }

}
