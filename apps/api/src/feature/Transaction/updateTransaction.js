const DetailedAccountModel = require("../../models/DetailedAccount");

const updateTransaction = async ({
    transactionId, transactionData, repository
}) => {
  const shouldReverseValue = (transactionData.type === 'Debit' && transactionData.value > 0) || 
                             (transactionData.type === 'Credit' && transactionData.value < 0);
  
  if (shouldReverseValue) {
    transactionData.value = transactionData.value * -1;
  }

  const updatedTransaction = await repository.update(transactionId, transactionData);

  return new DetailedAccountModel(updatedTransaction.toJSON());
};

module.exports = updateTransaction;
