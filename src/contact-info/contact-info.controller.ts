import { Body, Controller, Post } from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoDto } from '../dto/contactInfo.dto';

@Controller('contact-info')
export class ContactInfoController {
    constructor(private readonly contactService: ContactInfoService) { }
    

    @Post()
    async userContact(@Body() payload: ContactInfoDto) {
        return await this.contactService.userContact(payload)
    }
}
