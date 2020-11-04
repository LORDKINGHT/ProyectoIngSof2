import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteQuestionPage } from './delete-question.page';

describe('DeleteQuestionPage', () => {
  let component: DeleteQuestionPage;
  let fixture: ComponentFixture<DeleteQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
