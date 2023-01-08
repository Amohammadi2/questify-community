import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JWT_SECRET } from "./jwt.constants";
import { AppJwtService } from "./jwt.service";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS256'
      },
      verifyOptions: {
        ignoreExpiration: false,
        algorithms: ['HS256']
      }
    })
  ],
  providers: [AppJwtService],
  exports: [AppJwtService]
})
export class AppJwtModule {}