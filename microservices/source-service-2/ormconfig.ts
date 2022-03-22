module.exports = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [process.env.ENTITIY_PATH],
  synchronize: true,
}