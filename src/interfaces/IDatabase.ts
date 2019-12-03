import IDatabaseRepository from './IDatabaseRepository';

interface IDatabase {
  getRepository(name: String): IDatabaseRepository;
};

export default IDatabase;
