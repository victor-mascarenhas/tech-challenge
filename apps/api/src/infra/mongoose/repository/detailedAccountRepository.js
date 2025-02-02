const { DetailedAccount } = require("../modelos");

const create = async (action) => {
  const detailedAccount = new DetailedAccount(action);
  return detailedAccount.save();
};

const getById = async (id) => {
  return DetailedAccount.findById(id);
};

const get = async (detailedAccount = {}) => {
  return DetailedAccount.find(detailedAccount);
};

const update = async (id, updatedData) => {
  return DetailedAccount.findByIdAndUpdate(id, updatedData);
};

const deleteById = async (id) => {
  const result = await DetailedAccount.findByIdAndDelete(id);
  return result;
};

module.exports = {
  create,
  getById,
  get,
  update,
  deleteById,
};
