import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

export type TransactionCreate = Omit<Transaction, 'id'>;

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc: Balance, transaction: Transaction) => {
        acc[transaction.type] += transaction.value;
        acc.total +=
          transaction.type === 'income'
            ? transaction.value
            : -transaction.value;
        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );
    return balance;
  }

  public create({ title, type, value }: TransactionCreate): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
