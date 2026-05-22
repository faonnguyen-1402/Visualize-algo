import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Định nghĩa interface cho payload để TypeScript không còn báo lỗi 'any'
interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Ép kiểu cho hàm ExtractJwt.fromAuthHeaderAsBearerToken()
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() as (
        req: any,
      ) => string | null,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SECRET_BI_MAT_123',
    });
  }

  // Sử dụng kiểu dữ liệu JwtPayload thay cho 'any'
  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
