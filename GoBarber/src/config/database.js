module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  database: 'gobarber',
  username: 'docker',
  password: 'docker',
  operatorAliases: false,
  define: {
    timeStamps: true,
    underscored: true,
    underscoredAll: true
  }
}
