class BaseService {
  private BaseModel: any;
  constructor(model: any) {
    this.BaseModel = model;
  }

  list(where: any) {
    return this.BaseModel?.findMany(where || {});
  }

  create(data: any) {
    return new this.BaseModel(data).save();
  }

  read(where: any) {
    return this.BaseModel.findOne(where);
  }

  update(data: any, id: any) {
    return this.BaseModel.findByIdAndUpdate(id, data, { new: true });
  }

  updateWhere(data: any, where: any) {
    return this.BaseModel.findOneAndUpdate(where, data, { new: true });
  }

  delete(id: any) {
    return this.BaseModel.findByIdAndDelete(id);
  }
}

export default BaseService;
