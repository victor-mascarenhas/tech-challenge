const DetailedAccountModel = require("../../models/DetailedAccount");

const getTransaction = async ({ filter, repository }) => {
  const result = await repository.get(filter);
  const transactions = result?.map(
    (transaction) => new DetailedAccountModel(transaction)
  );
  return transactions;
};

module.exports = getTransaction;
