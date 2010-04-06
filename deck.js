function Deck(){
  this.deckEl = document.querySelector('.deck');
  this.slides = [];
}

Deck.prototype = {
  currentSlide: 1,

  getSlideTitles: function(){
    var titleEls = document.querySelectorAll('.slide .title'),
    titleList = [],i,len;

    for (i=0,len=titleEls.length;i<len;i++){
      titleList.push(titleEls[i].childNodes[0].nodeValue);
    }
    return titleList;
  }
}
