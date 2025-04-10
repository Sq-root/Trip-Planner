import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.scss']
})
export class TripPlannerComponent implements OnInit {
  protected tripPlanForm!: FormGroup;
  private tripPointsTemplate: FormGroup = new FormGroup({
    stPoint: new FormControl(''),
    endPoint: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
    this.tripPlanForm = new FormGroup({
      tripPoints: new FormArray([this.tripPointsTemplate]),
    })
  }

  get tripPoints(): FormArray {
    return this.tripPlanForm.get('tripPoints') as FormArray;
  }

  protected addTripPoint(): void {
    this.tripPoints.push(this.tripPointsTemplate);
    console.info('Adding trip point', this.tripPlanForm.value);
  }

}
