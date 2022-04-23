import { CurrentUser } from './../common/decorators/user.decorators';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { AuthService } from './../auth/auth.service';
import { LoginReqeustDto } from './../auth/dto/login.request.dto';
import { CatRequestDto } from './dto/cats.request.dto';
import { SuccessInterceptor } from './../common/interceptors/success.intercepter';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { Request } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cat } from './cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 조회' })
  @UseGuards(JwtAuthGuard) // middleware -> guard에서 인증처리후(strategy의 validate수행) request에 전달
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    // return request.user
    return cat.readOnlyData;
  }

  @ApiResponse({ status: 500, description: 'Server Error...' })
  @ApiResponse({ status: 200, description: 'Success', type: ReadOnlyCatDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginReqeustDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  // 서버의 static file들을 제공하기 위해 미들웨어 추가
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cats')))
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);
    // return 'uploadImg';
    // return { image: `http://localhost:8000/media/cats/${files[0].filename}` }; // 프론트엔드에 생성된 파일 제공
    return this.catsService.uploadImg(cat, files);
  }
}
