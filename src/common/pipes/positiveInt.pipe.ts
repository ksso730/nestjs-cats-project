import { Injectable, PipeTransform, HttpException } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform {
  // 파이프: 변환과 유효성 검사에 사용
  // transform 함수의 결과값이 pipe의 return
  // getSample(@Param('id', PipeA, PipeB) param: number)
  // ㄴ task_a(PipeA) -> task_b(PipeB) -> ... 파이프처럼 PipeA, PipeB 를 거쳐서 결과값은 param을 받게됨
  transform(value: number) {
    if (value < 0) {
      throw new HttpException('value는 0보다 커야함', 400);
    }
    return value;
  }
}
