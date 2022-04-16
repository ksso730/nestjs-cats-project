import { PickType } from '@nestjs/swagger';
import { Cat } from './../../cats/cats.schema';

export class LoginReqeustDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
