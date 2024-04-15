import { Article } from "../models/Article/Article";
import { Brand } from "../models/ArticleBrand/Brand";
import { Category } from "../models/ArticleCategory/Category";
import { ArticleOfferDetail } from "../models/ArticleOffer/ArticleOfferDetail";

export function instanceArticle(): Article {
    let brand = new Brand(0, '');
    let category = new Category(0, '');
    let offers = new Array<ArticleOfferDetail>();
    let article = new Article(
        0,
        '',
        '',
        0,
        '',
        0,
        0,
        brand,
        category,
        offers,
        offers
    );
    return article;
}