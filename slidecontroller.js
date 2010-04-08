function SlideController(deck){
  this.deck = deck;
  this.currentSlide = 1;
  this.showCurrentSlides();
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
  getCurrentSlides: function(){
    var cur = this.currentSlide,
    slides = this.deck.slides,
    showing = [];
    showing.push(slides[cur-1],slides[cur],slides[cur+1]);
    return showing;
  },

  showCurrentSlides: function(){
    var slides = this.getCurrentSlides(),i,len;
    for (i in slides){
      if (slides[i])
        slides[i].slideEl.style.display = "block";
    }
  },

  nextSlide: function(slide){
    var deck = this.deck,
    currentSlide = this.currentSlide;

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
  
  goTo: function(dir){
    var difference, deckSize = this.deck.slides.length;
    if (dir === "start"){
      difference = deckSize - this.currentSlide;
    } else if (dir === "end"){
      difference = deckSize - this.currentSlide;
    } else {
      
    }
    console.log(difference);
  },
  
  handleKeys: function(e,slide){
    console.log(e.keyIdentifier);
    switch(e.keyIdentifier){
    case "Right":
      this.nextSlide(slide);
      break;
    case "Left":
      this.previousSlide(slide);
      break;
    case "U+0042":
      this.goTo("start");
      break;
    case "U+0045":
      this.goTo("end");
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
