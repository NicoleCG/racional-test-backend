import { Injectable, PipeTransform } from '@nestjs/common';
import { HashingService } from '../services/hashing.service';

@Injectable()
export class HashPipe implements PipeTransform {
  constructor(private readonly hashingService: HashingService) {}

  transform(value: any) {
    value.passwordHash = this.hashingService.getHash(value.password);
    return value;
  }
}
