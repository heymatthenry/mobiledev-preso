(function(){
  var deck,slides,i,len;
  slides = document.querySelectorAll('section.slide');

  function Deck(){
    this.deck = document.querySelector('.deck');
    this.registerEvents();
  }

  Deck.prototype = {
    currentSlide: 1,

    registerEvents: function(){
      var deck = this.deck;

      document.addEventListener("keyup",function(e){
        Deck.prototype.handleKeys(e,deck);
      },false);
    },

    nextSlide: function(slide){
      var currentSlide = this.currentSlide;

      if (currentSlide != slides.length) {
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

  function Slide(slide,index,shouldCenter){
    this.slide = slide;
    this.index = index;
    this.shouldCenter = shouldCenter;
    this.init();
  };

  Slide.prototype = {
    init: function(){
      this.registerEvents();
      this.setBgDimensions(this.slide);
      this.setPosition();
      if (this.shouldCenter) this.centerContent(this.slide);
    },
    
    registerEvents: function(){
      var slide = this.slide,
      shouldCenter = this.shouldCenter;
      body = document.body;

      window.addEventListener("resize",function(){
        Slide.prototype.setBgDimensions(slide);
        if (shouldCenter)
          Slide.prototype.centerContent(slide);
      },false);
    },
    
    setPosition: function(){
      var slide = this.slide, 
      index = this.index,
      width = this.viewportDimensions()["width"];
      slide.style.left = width * index +"px";
    },

    setBgDimensions: function(slide){
      var viewport = this.viewportDimensions(),
      padding = window
        .getComputedStyle(slide)
        .getPropertyValue("padding-top")
        .replace("px","");

      slide.style.height = (viewport["height"] - padding) + "px";
      slide.style.width = (viewport["width"] - padding) + "px";
    },

    centerContent: function(slide){
      var viewport = this.viewportDimensions(),
      contentDiv = slide.childNodes[1],
      divStyle = window.getComputedStyle(contentDiv),
      contentHeight = divStyle.getPropertyValue("height").replace("px","");

      contentDiv.style.top = ( viewport["height"]/2 ) 
        - contentHeight + "px";
    },
    
    viewportDimensions: function(){
      return {
        "height": window.innerHeight,
        "width" : window.innerWidth
      }
    }
  }

  for (var i=0,len=slides.length; i<len; i++){
    new Slide(slides[i],i,false);
  }

  deck = new Deck();
})()