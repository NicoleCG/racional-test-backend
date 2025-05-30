import { Injectable } from '@nestjs/common';
import * as Crypto from 'crypto';

@Injectable()
export class HashingService {
  getHash(text: string): string {
    return Crypto.createHash('md5').update(text).digest('hex');
  }
}
