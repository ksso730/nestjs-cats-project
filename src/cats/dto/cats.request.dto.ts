import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CatRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEmail()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  name: string;
}
