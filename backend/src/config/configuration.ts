export default () => ({
  port: process.env.PORT,
  database: {
    uri: process.env.MONGODB_URI,
  },
  meteo: {
    apiUrl: process.env.METEO_API_URL,
  },
});
