(function(){
  var jsDeck;

  function JSDeck(){

    var deck,slides,i,len;
    slides = document.querySelectorAll('section.slide');

    function SlideLoader(deck){
      this.deck = deck;
    }

    SlideLoader.prototype = {
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
      }
    }

    function Deck(){
      this.deck = document.querySelector('.deck');
      this.slides = [];
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
      },

      getSlideTitles: function(){
        var titleEls = document.querySelectorAll('.slide .title'),
        titleList = [],i,len;

        for (i=0,len=titleEls.length;i<len;i++){
          titleList.push(titleEls[i].childNodes[0].nodeValue);
        }
        return titleList;
      }
    }

    function Slide(slideEl,index,shouldCenter){
      this.slideEl = slideEl;
      this.index = index;
      this.title = this.getTitle();
      this.shouldCenter = shouldCenter;

      this.init();
    };

    Slide.prototype = {
      init: function(){
        this.registerEvents();
        this.setBgDimensions(this.slideEl);
        this.setPosition();
        if (this.shouldCenter) 
          this.centerContent(this.slideEl);
      },
      
      getTitle: function(){
        var children = this.slideEl.childNodes[1].childNodes,
        title,child,i,len;
        
        for (i=0,len=children.length; i<len; i++){
          child = children[i];
          if (child.nodeName === "H2" && child.getAttribute("class").match("title"))
            title = child.childNodes[0].nodeValue;
        }

        return title;
      },

      registerEvents: function(){
        var slide = this.slide,
        shouldCenter = this.shouldCenter;
        body = document.body;

        window.addEventListener("resize",function(){
          Slide.prototype.setBgDimensions(slideEl);
          if (shouldCenter)
            Slide.prototype.centerContent(slideEl);
        },false);
      },
      
      setPosition: function(){
        var slideEl = this.slideEl, 
        index = this.index,
        width = this.viewportDimensions()["width"];
        slideEl.style.left = width * index +"px";
      },

      setBgDimensions: function(slideEl){
        var viewport = this.viewportDimensions(),
        padding = window
          .getComputedStyle(slideEl)
          .getPropertyValue("padding-top")
          .replace("px","");

        slideEl.style.height = (viewport["height"] - padding) + "px";
        slideEl.style.width = (viewport["width"] - padding) + "px";
      },

      centerContent: function(slideEl){
        var viewport = this.viewportDimensions(),
        contentDiv = slideEl.childNodes[1],
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
  }

  jsDeck = new JSDeck();
})()