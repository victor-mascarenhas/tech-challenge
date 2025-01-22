const TransactionDTO = require("../models/DetailedAccount");
require("dotenv").config();

class AccountController {
  constructor(di = {}) {
    this.di = Object.assign(
      {
        userRepository: require("../infra/mongoose/repository/userRepository"),
        accountRepository: require("../infra/mongoose/repository/accountRepository"),
        cardRepository: require("../infra/mongoose/repository/cardRepository"),
        transactionRepository: require("../infra/mongoose/repository/detailedAccountRepository"),

        saveCard: require("../feature/Card/saveCard"),
        salvarUsuario: require("../feature/User/salvarUsuario"),
        saveAccount: require("../feature/Account/saveAccount"),
        getUser: require("../feature/User/getUser"),
        getAccount: require("../feature/Account/getAccount"),
        updateTransaction: require("../feature/Transaction/updateTransaction"),
        saveTransaction: require("../feature/Transaction/saveTransaction"),
        getTransaction: require("../feature/Transaction/getTransaction"),
        deleteTransaction: require("../feature/Transaction/deleteTransaction"),
        getCard: require("../feature/Card/getCard"),
      },
      di
    );
  }

  async find(req, res) {
    const {
      accountRepository,
      getAccount,
      getCard,
      getTransaction,
      transactionRepository,
      cardRepository,
    } = this.di;

    try {
      const userId = req.user.id;
      const account = await getAccount({
        repository: accountRepository,
        filter: { userId },
      });
      const transactions = await getTransaction({
        filter: { accountId: account[0].id },
        repository: transactionRepository,
      });
      const cards = await getCard({
        filter: { accountId: account[0].id },
        repository: cardRepository,
      });

      res.status(200).json({
        message: "Conta encontrada carregado com sucesso",
        result: {
          account,
          transactions,
          cards,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro no servidor",
      });
    }
  }

  async deleteTransaction(req, res) {
    const { deleteTransaction, transactionRepository } = this.di;
    const { transactionId } = req.params;
    const transaction = await deleteTransaction({
      transactionId: transactionId,
      repository: transactionRepository,
    });

    res.status(200).json({
      message: "Transação excluída com sucesso",
      result: transaction,
    });
  }

  async createTransaction(req, res) {
    const { saveTransaction, transactionRepository } = this.di;
    const { accountId, value, type, from, to, anexo } = req.body;
    const transactionDTO = new TransactionDTO({
      accountId,
      value,
      from,
      to,
      type,
      date: new Date(),
      anexo,
    });

    const transaction = await saveTransaction({
      transaction: transactionDTO,
      repository: transactionRepository,
    });

    res.status(201).json({
      message: "Transação criada com sucesso",
      result: transaction,
    });
  }

  async updateTransaction(req, res) {
    const { updateTransaction, transactionRepository } = this.di;
    const { transactionId } = req.params;
    const { accountId, value, type, from, to, anexo } = req.body;
    const transactionDTO = new TransactionDTO({
      accountId,
      value,
      from,
      to,
      type,
      date: new Date(),
      anexo,
    });
    const transaction = await updateTransaction({
      transactionId: transactionId,
      transactionData: transactionDTO,
      repository: transactionRepository,
    });

    res.status(200).json({
      message: "Transação atualizada com sucesso",
      result: transaction,
    });
  }

  async getStatment(req, res) {
    const { getTransaction, transactionRepository } = this.di;

    const { accountId } = req.params;

    const transactions = await getTransaction({
      filter: { accountId },
      repository: transactionRepository,
    });

    res.status(201).json({
      message: "Transação criada com sucesso",
      result: {
        transactions,
      },
    });
  }

  async find(req, res) {
    const {
      accountRepository,
      getAccount,
      getCard,
      getTransaction,
      transactionRepository,
      cardRepository,
    } = this.di;

    try {
      const userId = req.user.id;
      const account = await getAccount({
        repository: accountRepository,
        filter: { userId },
      });
      const transactions = await getTransaction({
        filter: { accountId: account[0].id },
        repository: transactionRepository,
      });
      const cards = await getCard({
        filter: { accountId: account[0].id },
        repository: cardRepository,
      });

      res.status(200).json({
        message: "Conta encontrada carregado com sucesso",
        result: {
          account,
          transactions,
          cards,
        },
      });
    } catch (error) {
      res.status(500).json({
        message: "Erro no servidor",
      });
    }
  }
}

module.exports = AccountController;
