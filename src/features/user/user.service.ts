import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dto/pagination-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashingServiceProtocol } from '../auth/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.verifyUserExistsByField(createUserDto);
    const passWordHashed = await this.hashingService.hash(
      createUserDto.password,
    );

    const payload = {
      ...createUserDto,
      password: passWordHashed,
    };
    const user = this.userRepository.create(payload);

    return await this.userRepository.save(user);
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 15, offset = 0 } = paginationDto;
    return await this.userRepository.find({
      take: limit,
      skip: offset,
      order: { id: 'DESC' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} ${updateUserDto.name} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async verifyUserExistsByField({ email }: CreateUserDto) {
    if (email) {
      const emailExists = await this.userRepository.exists({
        where: { email },
      });

      if (emailExists) {
        throw new ConflictException(
          'Já existe uma conta associada a este e-mail.',
        );
      }
    }
  }
}
