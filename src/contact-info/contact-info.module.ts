import { Module } from '@nestjs/common';
import { ContactInfoController } from './contact-info.controller';
import { ContactInfoService } from './contact-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfoEntity } from '../entity/contactInfo.entity';
import { UserEntity } from 'src/entity/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([ContactInfoEntity, UserEntity])
    ],
  controllers: [ContactInfoController],
  providers: [ContactInfoService]
})
export class ContactInfoModule {}
