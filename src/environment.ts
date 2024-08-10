import "dotenv/config";

const environment = {
  serverPort: process.env.SERVER_PORT,
  bggRootUrl: process.env.BGG_ROOT_URL,
  bggUsername: process.env.BGG_USERNAME,
};

export default environment;
