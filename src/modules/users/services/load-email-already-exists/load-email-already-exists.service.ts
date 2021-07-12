import { User } from '@/infra/typeorm/entities/user/user-entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoadUserByEmailRepository } from '@/modules/users/repositories/load-user-by-email/load-user-by-email.repository';

@Injectable()
export class LoadEmailAlreadyExistsService {
  constructor(
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
  ) {}

  async loadEmailAlreadyExists(email: string): Promise<User> {
    const userExists = await this.loadUserByEmailRepository.loadUserByEmail(
      email,
    );

    if (userExists) {
      throw new NotFoundException('Email already in use.');
    }

    return userExists;
  }
}
