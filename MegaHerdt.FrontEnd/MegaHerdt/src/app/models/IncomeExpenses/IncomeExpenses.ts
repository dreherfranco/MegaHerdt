import { ArticleDetail } from "./ArticleDetail";
import { ClientDetail } from "./ClientDetail";

export class IncomeExpenses {
    articles: ArticleDetail[] = [];
    amountOfLabor: number = 0;
    client: ClientDetail = new ClientDetail;
    totalIncomePaidByReparation: number = 0;
    paymentsMade: number = 0;
    totalPayments: number = 0;
  }