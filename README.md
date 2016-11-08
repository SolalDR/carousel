# CAROUSEL JS VANILLA

##Implementer

- Cloner le repository
```
git clone https://github.com/SolalDR/carousel.git
```
- Glisser le dossier carousel dans votre projet
- Importer la feuille de style "carousel.css" dans le header
```html
<link rel="stylesheet" href="carousel/carousel.css">
```
- Créer votre élément carousel en vous basant sur l'exemple fournis dans le dossier test
```html
<div class="carousel" id="foo">
  <img src="image1.jpg" alt="Image2" class="item-carousel active" data-animation="opacity"/>
  <img src="image2.jpg" alt="Image3" class="item-carousel" data-animation="opacity"/>
  <img src="image3.jpg" alt="Image4" class="item-carousel" data-animation="opacity"/>
</div>
```
- Importer le script "carousel.js" à la fin du body
```html
  //Your code here

  <script type="text/javascript" src="carousel/carousel.js"></script>
  <script>
    var carousel = new Carousel(document.querySelector("#foo"));
    carousel.launch(); //Lance le carousel
  </script>
</body>
```
##Configurer

###Comment définir un paramètre
Ce carousel est configurable de plusieurs manière. Un attribut peut donc être renseigné :
- En attribut HTML (ex : data-autoload)
```html
//data-interval détermine la durée de l'animation
<div class="carousel" id="foo" data-autoload data-interval="3000">
  //Mes item-carousel
```
- En passang un objet de configuration lors de l'instance du carousel.
```javascript
var carousel = new Carousel( document.querySelector("#carousel") , {
  autoload : true
})
```
- Directement en manipulant l'objet
(Attention, si le carousel est déja lancer à l'aide de l'attribut `autoload` ou de la méthode `.launch()`, cette méthode ne fonctionnera pas.
```javascript
carousel.interval = 3000;
carousel.launch();
```

###Liste des paramètres
Nom attribut | Data attribut | Description
------------ | ------------- | -------------
`autoload` (boolean) | `data-autoload` | Permet de lancer automatiquement le carousel (permet d'éviter d'utiliser la méthode `launch()`)
`stopOnMouseHover` (boolean)| `data-stopOnMouseHover` | Si vrai, cet attribut stop l'action du carousel lorsque le passe la souris dessus.
`interval` (int)| `data-interval="3000"` | Détermine la durée de l'animation 
`displayArrowSelectors` (boolean)|  | Permet de cacher les flèches latérales
`displayButtonSelectors` (boolean) |  | Permet de cacher les boutons de sélections
