export class DescriptionEmptyError extends Error {
  constructor() {
    super(`Description is empty`);
  }
}
