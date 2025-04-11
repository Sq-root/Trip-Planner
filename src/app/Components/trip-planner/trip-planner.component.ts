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
  protected tripRoutesGraph: any[] = [];
  cityX: { [city: string]: number } = {}; // To track positions
  spacing = 200;
  padding = 50;


  constructor() { }

  ngOnInit(): void {
    this.tripPlanForm = new FormGroup({
      tripPoints: new FormArray([this.tripPointsTemplate]),
    })
  }

  get tripPoints(): FormArray {
    return this.tripPlanForm.get('tripPoints') as FormArray;
  }

  //Method : Add New Trip Routes
  protected addTripPoint(): void {
    this.tripPoints.push(new FormGroup({
      stPoint: new FormControl(''),
      endPoint: new FormControl(''),
    }));
  }

  //Method : Create Trip Routes Graph
  protected createTripRoutes(): void {
    this.tripRoutesGraph = [];
    const rawTrips = this.tripPlanForm.value.tripPoints || [];

    for (let i = 0; i < rawTrips.length; i++) {
      const { stPoint, endPoint } = rawTrips[i];
      if (!stPoint || !endPoint) continue;
      const { level, type } = this.idetifyRoutesType(stPoint, endPoint);
      this.tripRoutesGraph.push({ stPoint, endPoint, level, type });
    };
    console.log('Trip Routes Graph:', this.tripRoutesGraph);
    const cities = [...new Set(this.tripRoutesGraph.flatMap(t => [t.stPoint, t.endPoint]))];
    cities.forEach((city, i) => this.cityX[city] = this.padding + i * this.spacing);
  }

  private idetifyRoutesType(stPoint: string, endPoint: string): { level: number; type: 'continued' | 'not-continued' | 'repeated' } {
    const lastTripRoute = this.tripPoints.value[this.tripPoints.value.length - 1];

    if (lastTripRoute?.endPoint === stPoint) {
      return { level: 1, type: 'continued' };
    }
    const repeated = this.tripPoints.value.some(t => t.stPoint === stPoint && t.endPoint === endPoint);
    if (repeated) {
      return { level: 2, type: 'repeated' };
    }
    return { level: 1, type: 'not-continued' };

  }

  getY(level: number): number {
    return 100 + (level - 1) * 60;
  }
  get svgWidth(): number {
    return (Object.keys(this.cityX).length * this.spacing) + this.padding;
  }

}
