export class DescriptionTooLongError extends Error {
  constructor(description: string) {
    super(`Description <${description}> is too long`);
  }
}
