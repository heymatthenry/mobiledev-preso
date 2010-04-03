(function(){
  var slides,i,len;

  function Slide(el){
    this.el = el;
    this.init();
  };

  Slide.prototype = {
    init: function(){
      this.setDimensions();
    },
    
    registerEvents: function(){
      
    },
    
    setDimensions: function(){
      var viewportHeight = window.innerHeight,
      viewportWidth = window.innerWidth,
      padding = window
        .getComputedStyle(this.el)
        .getPropertyValue("padding-top")
        .replace("px","");

      console.log(padding);

      this.el.style.height = (viewportHeight - padding) + "px";
      this.el.style.width = (viewportWidth - padding) + "px";
    }
  }
  
  slides = document.querySelectorAll('section.slide');

  for (var i=0,len=slides.length; i<len; i++){
    new Slide(slides[i]);
  }
})()