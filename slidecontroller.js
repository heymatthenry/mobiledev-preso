function SlideController(deck){
  this.deck = deck;
}

SlideController.prototype = {
  setCurrentSlide: function(slideNum){
    this.currentSlide = slideNum;
  },

  /*
         * Unhide the current slide as 
                * well as the previous and next slides
                       *
                              * @method showCurrentSlide
                                     **/
  showCurrentSlide: function(){
    var curSlideIndex = this.deck.currentSlide.index,
    prevSlide,
    nextSlide = curSlide.next();
  },

  nextSlide: function(slide){
    var deck = this.deck,
    currentSlide = deck.currentSlide;

    if (currentSlide != deck.slides.length) {
      var width = this.viewportDimensions()["width"] * currentSlide;
      slide.style.webkitTransform = "translateX(-"+width+"px)";
      this.currentSlide += 1;
    } else {
      console.log("Already at last slide");
    }
  },

  previousSlide: function(slide){
    var currentSlide = this.currentSlide;

    if (currentSlide != 1){
      var xPos = slide.style.webkitTransform.match(/\d+/)[0],
      width = xPos - this.viewportDimensions()["width"];
      slide.style.webkitTransform = "translateX(-"+width+"px)";
      this.currentSlide -= 1;
    } else {
      console.log("Already on first slide");
    }
  },
  
  handleKeys: function(e,slide){
    switch(e.keyIdentifier){
    case "Right":
      this.nextSlide(slide);
      break;
    case "Left":
      this.previousSlide(slide);
      break;
    case "U+0020":
      e.shiftKey ? 
        this.previousSlide(slide):
        this.nextSlide(slide);
      break;
    }
  },

  viewportDimensions: function(){
    return {
      "height": window.innerHeight,
      "width" : window.innerWidth
    }
  }

}
