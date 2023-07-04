import { CreateUserRequest } from './create-user-request.dto';
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class AppService {
  private readonly users: any[] = [];
  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello from backend';
  }
  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
  }
  getAnalytics() {
    console.log('from the app service');
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
