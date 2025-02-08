import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
@Component({
  selector: 'app-termsconditions',
  templateUrl: './termsconditions.page.html',
  styleUrls: ['./termsconditions.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class TermsconditionsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
