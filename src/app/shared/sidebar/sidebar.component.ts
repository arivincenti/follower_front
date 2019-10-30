import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy
{
  
  constructor(
    private router: Router
    ) { }

  ngOnInit()
  {

  }

  ngOnDestroy(){

  }

  logout()
  {
    this.router.navigate(['/login']);
  }

}
