import { BadInputError } from './bad-input-error';

describe('BadInputError', () => {
  it('should create an instance', () => {
    expect(new BadInputError()).toBeTruthy();
  });
});
