import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { mockQuestion } from '@proquizium/testing';
import { QuestionsService } from './questions.service';

describe('ChallengesService', () => {
  let httpTestingController: HttpTestingController;
  let service: QuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(QuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('should call http.', () => {
    it('get() on service.all()', () => {
      service.all().subscribe((res) => {
        expect(res).toEqual(mockQuestion);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush([mockQuestion]);
      httpTestingController.verify();
    });

    it('get(url(model.id)) on service.find(model.id)', () => {
      service.find(mockQuestion.id).subscribe((res) => {
        expect(res).toEqual(mockQuestion);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockQuestion.id),
      );
      req.flush(mockQuestion);
      httpTestingController.verify();
    });

    it('post(url, model) on service.create(model)', () => {
      service.create(mockQuestion).subscribe((res) => {
        expect(res).toEqual(mockQuestion);
      });

      const req = httpTestingController.expectOne(service['getUrl']());
      req.flush(mockQuestion);
      httpTestingController.verify();
    });

    it('put(url(model.id), model) on service.create(model)', () => {
      service.update(mockQuestion).subscribe((res) => {
        expect(res).toEqual(mockQuestion);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockQuestion.id),
      );
      req.flush(mockQuestion);
      httpTestingController.verify();
    });

    it('delete(url(model.id)) on service.delete(model.id)', () => {
      service.delete(mockQuestion).subscribe((res) => {
        expect(res).toEqual(mockQuestion);
      });

      const req = httpTestingController.expectOne(
        service['getUrlWithId'](mockQuestion.id),
      );
      req.flush(mockQuestion);
      httpTestingController.verify();
    });
  });
});
