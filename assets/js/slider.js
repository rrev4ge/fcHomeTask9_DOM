"use strict";

class Slide {
  constructor(src, description, info) {
    this._src = src;
    this._description = description;
    this._info = info;
  }

  get src() {
    return this._src;
  }

  get description() {
    return this._description;
  }

  get info() {
    return this._info;
  }
}

class Slider {
  /**
   *
   * @param {Slides} slides
   * @param {number} currentIndex
   */
  constructor(slides, currentIndex = 0) {
    this._slides = slides;
    this._currentIndex = currentIndex;
  }

  get currentIndex() {
    return this._currentIndex;
  }

  set currentIndex(newIndex) {
    // VALIDATION
    return (this._currentIndex = newIndex);
  }

  get nextIndex() {
    return (this.currentIndex + 1) % this._slides.length;
  }

  get prevIndex() {
    return (this.currentIndex - 1 + this._slides.length) % this._slides.length;
  }

  get currentSlide() {
    return this._slides[this.currentIndex];
  }
}
