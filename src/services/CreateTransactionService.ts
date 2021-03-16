import TransactionsRepository, {
  TransactionCreate,
} from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionCreate): Transaction {
    // Validate Type
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Invalid transaction type');
    }
    // Validate Value
    if (value <= 0) {
      throw new Error('Invalid transaction value');
    }
    // Validate current Balance
    if (type === 'outcome') {
      const { total } = this.transactionsRepository.getBalance();
      if (total < value) {
        throw new Error('Insufficient Balance');
      }
    }
    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
