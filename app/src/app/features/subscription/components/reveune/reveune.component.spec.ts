/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReveuneComponent } from './reveune.component';

describe('ReveuneComponent', () => {
  let component: ReveuneComponent;
  let fixture: ComponentFixture<ReveuneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReveuneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReveuneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
