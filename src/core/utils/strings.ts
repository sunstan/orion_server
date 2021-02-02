import { hash, genSalt, compare } from 'bcrypt';

export const encrypt = async (
  str: string,
  saltRounds: number = 10,
): Promise<string> => await hash(str, await genSalt(saltRounds));

export const matching = async (str: string, hash: string): Promise<boolean> =>
  await compare(str, hash);
