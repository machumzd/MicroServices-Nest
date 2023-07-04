import { Injectable } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! from sample communication';
  }
  handleUserCreated(data: CreateUserEvent) {
    console.log('handleUserCreated -COMMUNICATIONS', data);
  }
}
