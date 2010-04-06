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
