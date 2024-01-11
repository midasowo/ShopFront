import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MaterialModule} from "../../material.module";
import {FlexModule} from "@angular/flex-layout";
import {SidebarService} from "./sidebar.service";
import {SidebarCategory} from "./model/sidebar-category";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FlexModule, MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  categories: Array<SidebarCategory> = []

  constructor(private sidebarService: SidebarService) {
  }

  ngOnInit(): void {
    this.getCategories()
  }

  private getCategories() {
    this.sidebarService.getCategories()
      .subscribe(categories => this.categories = categories)
  }
}
