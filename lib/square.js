class Square {
  constructor(options = {}) {
    this.parent = options.parent;
    this.start = options.start;
    this.end = options.end;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

export default Square;
