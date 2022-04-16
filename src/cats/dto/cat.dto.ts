import { ApiProperty } from '@nestjs/swagger';

export class ReadOnlyCatDto {
  @ApiProperty({
    example: '192399',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'ksso730@gmail.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'your name',
    description: 'name',
  })
  name: string;
}
