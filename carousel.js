function Carousel(el, config = {}){
  this.carousel = el;
  this.interval = parseInt(el.getAttribute("data-interval"));
  this.items = el.getElementsByClassName("item-carousel");
  this.currentItem = {};
  this.controls = {};

  this.setConfig(config);

  // On détermine si un élement est actif par défault
  for(i=0; i<this.items.length; i++){
    if(this.items[i].className.match("active")){
      this.currentItem.el = this.items[i];
      this.currentItem.rank = i;
      break;
    }
  }
  // Si il n'y en a pas par défault
  if(!this.currentItem.el){
    this.currentItem.el = this.items[0];
    this.currentItem.rank = 0;
  }
  if(this.autoload){
    this.launch();
  }
}

Carousel.prototype.setConfig = function(config) {

  // Autoload
  if(this.carousel.hasAttribute("data-autoload")){
    this.autoload = true;
  }
  if(config.autoload){
    this.autoload = config.autoload;
  }

  // Affichage des flèche de sélection
  if(config.displayArrowSelectors === false){
    this.displayArrowSelectors = false;
  } else {
    this.displayArrowSelectors = true;
  }

  // Affichage des boutons de sélection
  if(config.displayButtonSelectors === false){
    this.displayButtonSelectors = false;
  } else {
    this.displayButtonSelectors = true;
  }

  // Interval
  if(config.interval) {
    this.interval = config.interval;
  }

  // Comportement au hover
  if(this.carousel.hasAttribute("data-stopOnMouseHover")){
    this.stopOnMouseHover = true;
  }
  if(config.stopOnMouseHover){
    this.stopOnMouseHover = config.stopOnMouseHover;
  }
}

Carousel.prototype.getNextItemRank = function(){
  var result;
  if (this.currentItem.rank >= this.items.length - 1) {
      result = 0;
  } else {
      result = this.currentItem.rank+1;
  }
  return result;
}
Carousel.prototype.getPreviousItemRank = function(){
  var result;
  if (this.currentItem.rank > 0) {
    result = this.currentItem.rank - 1
  } else {
    result = this.items.length-1;
  }
  return result;
}

Carousel.prototype.hide = function(el){
  el.className = el.className.replace("active", "leave");
  if (this.interval) {
    setTimeout(function() {
      el.className = el.className.replace("leave", "");
    }, 1000)
  } else {
    el.className = el.className.replace("leave", "");
  }
}
Carousel.prototype.display = function(el){
  el.className += " active"
}

Carousel.prototype.updateButtonsStatus = function(){
  if(this.displayButtonSelectors) {
    for(i=0; i<this.controls.buttons.length; i++){
      this.controls.buttons[i].className = this.controls.buttons[i].className.replace("active", "");
    }
    this.controls.buttons[this.currentItem.rank].className += " active";
  }
}

Carousel.prototype.updateCurrentItem = function(rank){
  this.hide(this.currentItem.el);
  this.currentItem.rank = rank;
  this.currentItem.el = this.items[rank];
  this.display(this.currentItem.el);
  this.updateButtonsStatus();
}

Carousel.prototype.generateSelectors = function(){
  if(this.displayArrowSelectors){
    var slideLeft = document.createElement("div");
    var slideRight = document.createElement("div");
    slideLeft.className = "leftSelector";
    slideRight.className = "rightSelector";
    this.carousel.appendChild(slideLeft);
    this.carousel.appendChild(slideRight);
    this.controls.left = slideLeft;
    this.controls.right = slideRight;
  }

  if(this.displayButtonSelectors) {
    var buttonContainer = document.createElement("div")
    var buttons = [];
    for (i = 0; i < this.items.length; i++) {
      (function() {
      buttons.push(document.createElement("input"));
      buttons[i].setAttribute("type", "button");
      })();
    }

    buttonContainer.className = "button_selector";
    for (i = 0; i < this.items.length; i++) {
      buttons[i].className = "button";
      buttonContainer.appendChild(buttons[i]);
    }
    this.carousel.appendChild(buttonContainer);
    this.controls.buttons = buttons;
  }
}

Carousel.prototype.next = function(){
  var futurItemRank = this.getNextItemRank();
  this.updateCurrentItem(futurItemRank);
}
Carousel.prototype.previous = function(){
  var futurItemRank = this.getPreviousItemRank();
  this.updateCurrentItem(futurItemRank);
}

Carousel.prototype.initEvents = function(){
  var that = this;
  if(this.controls.left){
    this.controls.left.addEventListener("click", function(){
      that.previous();
    }, false);
  }
  if(this.controls.right) {
    this.controls.right.addEventListener("click", function(){
      that.next();
    }, false)
  }
  if(this.controls.buttons){
    for(i=0; i<this.controls.buttons.length; i++){
      (function(){
        var rank = i;
        that.controls.buttons[rank].addEventListener("click", function(){
          that.updateCurrentItem(rank);
        }, false)
      })();
    }
  }
  if(this.stopOnMouseHover){
    this.carousel.addEventListener("mouseenter", function(){
      that.stopInterval();
    }, false)
    this.carousel.addEventListener("mouseleave", function(){
      that.startIntervalFunction(that);
    }, false)
  }
}

Carousel.prototype.startIntervalFunction = function(that){
  this.intervalFunction = setInterval(function(){
    that.next();
  },
  this.interval)
}

Carousel.prototype.stopInterval = function(){
  clearInterval(this.intervalFunction);
}

Carousel.prototype.launch = function(){
  // On génère les sélecteur
  this.generateSelectors();
  this.initEvents();
  this.updateButtonsStatus();
  if(this.interval){
    this.startIntervalFunction(this);
  }
}


var carousel = new Carousel(document.getElementById("carousel"), {
  displayArrowSelectors : false,
  interval : 3000,
  stopOnMouseHover : true
});
