interface IDatabaseRepository {
  getBy(params: any): Array<any>;
  save(any): Boolean;
};

export default IDatabaseRepository;
