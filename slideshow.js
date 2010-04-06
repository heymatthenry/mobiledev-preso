(function(){
  var jsDeck;

  function JSDeck(){

    var sc,deck,slides,i,len;

    slideEls = document.querySelectorAll('section.slide');
    deck = new Deck();

    for (i=0,len=slideEls.length; i<len; i++){
      deck.slides.push(new Slide(slideEls[i],i,false));
    }

    sc = new SlideController(deck);

    function registerEvents(){
      var deckEl = sc.deck.deckEl;
      document.addEventListener("keyup",function(e){
        sc.handleKeys(e,deckEl);
      },false);
    }
    registerEvents();
  }

  jsDeck = new JSDeck();
})()