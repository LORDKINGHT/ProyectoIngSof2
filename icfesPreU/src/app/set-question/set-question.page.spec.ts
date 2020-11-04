import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetQuestionPage } from './set-question.page';

describe('SetQuestionPage', () => {
  let component: SetQuestionPage;
  let fixture: ComponentFixture<SetQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
