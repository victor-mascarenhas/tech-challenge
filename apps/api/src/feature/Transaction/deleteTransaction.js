const deleteTransaction = async ({ id, repository }) => {
  const result = await repository.deleteById(id);
  return result;
};

module.exports = deleteTransaction;
