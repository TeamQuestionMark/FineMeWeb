type ValidatorFunction = (input: string) => Promise<boolean> | boolean;

const emailPattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;

/**
 * @usage
 * ```ts
 * const emailValidator = new Validator().required().email()
 * const customValidator = new Validator().min(3).exec((input) => {
 *    // do something like server request
 *    return true // or false
 * })
 * ```
 */

export default class Validator {
  isValid: boolean = true;
  private chain: Array<ValidatorFunction> = [];

  required = () => {
    this.chain.push((input: string) => input.length > 0);
    return this;
  };

  max = (max: number) => {
    this.chain.push((input: string) => input.length < max);
    return this;
  };

  min = (min: number) => {
    this.chain.push((input: string) => input.length >= min);
    return this;
  };

  test = (pattern: RegExp) => {
    this.chain.push((input: string) => new RegExp(pattern).test(input));
    return this;
  };

  email = () => {
    return this.test(emailPattern);
  };

  exec = async (fn: ValidatorFunction) => {
    this.chain.push(fn);
    return this;
  };

  validate = async (input: string) => {
    for await (const validator of this.chain) {
      const isValid = await validator(input);
      if (!isValid) return false;
    }
    return true;
  };
}
