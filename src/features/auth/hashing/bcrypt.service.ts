import { HashingServiceProtocol } from './hashing.service';
import * as bcryptjs from 'bcryptjs';

export class BCryptService extends HashingServiceProtocol {
  async hash(password: string): Promise<string> {
    const salt = await bcryptjs.genSalt();
    return bcryptjs.hash(password, salt);
  }
  async compare(password: string, passwordHash: string): Promise<boolean> {
    return bcryptjs.compare(password, passwordHash);
  }
}
