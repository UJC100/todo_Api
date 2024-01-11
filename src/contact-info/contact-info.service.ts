import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfoDto } from '../dto/contactInfo.dto';
import { ContactInfoEntity } from '../entity/contactInfo.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';

@Injectable()
export class ContactInfoService {
    constructor(
        @InjectRepository(ContactInfoEntity) private contactRepo: Repository<ContactInfoEntity>,
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>
    ) { }
    
    async userContact(payload: ContactInfoDto) {
        const saveContact = this.contactRepo.create(payload)
        return await this.contactRepo.save(saveContact)
    }
}
