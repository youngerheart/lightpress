const Config = {
  dbUri: 'mongodb://127.0.0.1:27017/lightpress',
  dbOptions: { useMongoClient: true },
  serverPort: 3000,
  permittedDir: ['/.well-known']
};

export default Config;
