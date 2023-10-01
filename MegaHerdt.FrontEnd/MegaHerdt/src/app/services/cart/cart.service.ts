import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from 'src/app/models/Article/Article';
import { CartArticleDetail } from 'src/app/models/Cart/CartArticleDetail';
import { PurchaseArticleCreation } from 'src/app/models/PurchaseArticle/PurchaseArticleCreation';
import { ArticleService } from '../articles/article.service';
import { ArticlesFilterByEnum } from 'src/app/utils/ArticlesFilterByEnum';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartArticlesDetails: BehaviorSubject<Array<CartArticleDetail>> = new BehaviorSubject<Array<CartArticleDetail>>(this.getCartFromStorage());
  articles: BehaviorSubject<Array<Article>> = new BehaviorSubject<Array<Article>>([]);
  total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // Define un diccionario que mapea los valores de ArticlesFilterByEnum a las funciones del servicio
 filtersResolver: Record<ArticlesFilterByEnum, () => void> = this.constructFiltersHandler();

  /**
   * Variable para saber si filtrar por Categoria, Marca, Ofertas o traer todos los articulos.
   * Se setea dependiendo en que vista estemos.
   */
  filterBy: ArticlesFilterByEnum = ArticlesFilterByEnum.GET_ALL;
  /**
   * Valor que se usa para el caso de Categorias y Marcas (representa el id para poder filtrar)
   */
  filterValue: any;

  constructor(private _articleService: ArticleService) {
    this.updateTotal();
  }

  /**
   * Construye el diccionario de filterHandlers. 
   * @returns 
   */
  constructFiltersHandler(){
    return {
      [ArticlesFilterByEnum.GET_ALL]: () => {
        this._articleService.getAllEnableds().subscribe({
          next: result => {
            this.setArticlesStock(result);
          }
        });
      },
      [ArticlesFilterByEnum.CATEGORY]: () => {
        this._articleService.getArticlesByCategory(this.filterValue).subscribe({
          next: result => {
            this.setArticlesStock(result);
          }
        });
      },
      [ArticlesFilterByEnum.BRAND]: () => {
        this._articleService.getArticlesByBrand(this.filterValue).subscribe({
          next: result => {
            this.setArticlesStock(result);
          }
        });
      },
      [ArticlesFilterByEnum.ON_OFFER]: () => {
        this._articleService.getArticlesOnOffer().subscribe({
          next: result => {
            this.setArticlesStock(result);
          }
        });
      }
    };
  }

  /**
   * Establece el tipo de filtro correspondiente.
   * Se utiliza desde los componentes que muestran articulos
   * @param filterBy 
   * @param filterValue 
   */
  setFilterBy(filterBy: ArticlesFilterByEnum, filterValue: any = null){
    this.filterBy = filterBy;
    this.filterValue = filterValue;
  }

  loadArticlesStock() {
    // Llama a la función correspondiente según el valor de filterBy
    const handler = this.filtersResolver[this.filterBy];
    if (handler) {
      // Ejecuta la busqueda en el backend correspondiente al tipo de filtro seteado.
      handler();
    } else {
      // Manejar caso no válido o desconocido
    }
  }

  /**
   * Se utiliza para setear el stock de los articulos obtenidos del backend 
   * en el metodo loadArticlesStock()
   * @param result 
   */
  setArticlesStock(result: any){
    let articles = result;
    let cartArticlesDetails = this.getCartFromStorage();
    if (cartArticlesDetails != null) {
      for (var i = 0; i < articles.length; i++) {
        for (var j = 0; j < cartArticlesDetails.length; j++) {
          if (articles[i].id == cartArticlesDetails[j].article.id) {
            articles[i].stock = (articles[i].stock - cartArticlesDetails[j].purchaseArticle.articleQuantity);
          }
        }
      }
    }
    this.updateArticles(articles);
  }  

  setArticles(articles: Article[]) {
    let cartArticlesDetails = this.getCartFromStorage();
    if (cartArticlesDetails != null) {
      for (var i = 0; i < articles.length; i++) {
        for (var j = 0; j < cartArticlesDetails.length; j++) {
          if (articles[i].id == cartArticlesDetails[j].article.id) {
            articles[i].stock = (articles[i].stock - cartArticlesDetails[j].purchaseArticle.articleQuantity);
          }
        }
      }
      this.updateArticles(articles);
    }
  }

  updateCartArticlesDetails(cartArticlesDetails: Array<CartArticleDetail>) {
    this.cartArticlesDetails.next(cartArticlesDetails);
  }

  updateArticles(articles: Array<Article>) {
    this.articles.next(articles);
  }

  updateTotal() {
    let cartArticles = this.getCartFromStorage();
    if (cartArticles != null) {
      var total = 0;
      for (var i = 0; i < cartArticles.length; i++) {
        total += (cartArticles[i].purchaseArticle.articleQuantity * cartArticles[i].purchaseArticle.articlePriceAtTheMoment);
      }
      this.total.next(total);
    }
  }

  getCartFromStorage() {
    let cart = localStorage.getItem("cart");
    if (cart != null)
      return JSON.parse(cart);
  }

  getCart(): Array<CartArticleDetail> {
    return this.cartArticlesDetails.getValue();
  }

  addToCart(article: Article, purchaseArticle: PurchaseArticleCreation) {
    let cart = this.getCartFromStorage();
    purchaseArticle.articleName = article.name;
    purchaseArticle.articlePriceAtTheMoment = article.unitValueWithOffer;

    if (this.availableStock(article)) {
      var cartArticleDetail = new CartArticleDetail(article, purchaseArticle);
      if (this.existsArticleInCart(article)) {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].article.id == article.id) {
            cart[i].purchaseArticle.articleQuantity++;
          }
        }
      }
      else if (cart == null) {
        cart = new Array<CartArticleDetail>();
        cart.push(cartArticleDetail);
      }
      else {
        cart.push(cartArticleDetail);
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      this.updateCartArticlesDetails(cart);
      this.loadArticlesStock();
      this.updateTotal();
    }
  }

  removeUnitsFromCart(article: Article) {
    let cart = this.getCartFromStorage();
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].article.id == article.id) {
        cart = this.verifyAndRemoveUnits(cart, i);
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    this.updateCartArticlesDetails(cart);
    this.loadArticlesStock();
    this.updateTotal();
  }

  removeArticleFromCart(article: Article){
    let cart = this.getCartFromStorage();
    const articleIndiceRemove = cart.indexOf(cart.find((el: { id: any; }) => el.id === article.id));

    cart.splice(articleIndiceRemove, 1);

    localStorage.setItem('cart', JSON.stringify(cart));

    this.updateCartArticlesDetails(cart);
    this.loadArticlesStock();
    this.updateTotal();
  }

  verifyAndRemoveUnits(cartArticlesDetails: Array<CartArticleDetail>, index: number): Array<CartArticleDetail> {
    if (cartArticlesDetails[index].purchaseArticle.articleQuantity > 0) {
      --cartArticlesDetails[index].purchaseArticle.articleQuantity;
      if (cartArticlesDetails[index].purchaseArticle.articleQuantity == 0) {
        //remove from cart
        cartArticlesDetails.splice(index, 1);
      }
    }
    return cartArticlesDetails;
  }

  existsArticleInCart(articleDetail: Article): boolean {
    var cartArticlesDetails: Array<CartArticleDetail> = this.getCartFromStorage();
    if (cartArticlesDetails != null) {
      for (var i = 0; i < cartArticlesDetails.length; i++) {
        if (cartArticlesDetails[i].article.id == articleDetail.id) {
          return true;
        }
      }
    }
    return false;
  }

  isEmpty(): boolean {
    return localStorage.getItem("cart") == null || localStorage.getItem("cart") == 'undefined';
  }

  availableStock(article: Article): boolean {
    return article.stock > 0;
  }

  availableStockCart(article: Article, purchaseArticle: PurchaseArticleCreation): boolean {
    return article.stock - purchaseArticle.articleQuantity > 0;
  }

  emptyCart(): void {
    localStorage.removeItem("cart");
    this.loadArticlesStock();
    this.updateCartArticlesDetails([]);
  }
}
