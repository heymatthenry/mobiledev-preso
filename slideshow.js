(function(){
  var jsDeck;

  function JSDeck(){

    var sc,i,len,
    slideEls = document.querySelectorAll('section.slide'),
    deck = new Deck(),
    sc = new SlideController(deck),
    xButton = document.querySelector('#notice a');

    for (i=0,len=slideEls.length; i<len; i++){
      deck.slides.push(new Slide(slideEls[i],i,false));
    }

    document.addEventListener("keyup",function(e){
      sc.handleKeys(e,sc.deck.deckEl);
    },false);

    xButton.addEventListener("click",function(e){
      e.target.parentNode.style.display = "none";
    });
  }

  jsDeck = new JSDeck();
})()