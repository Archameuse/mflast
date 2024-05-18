export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEON_DB_URL: string;
      DB_KEY: string;
      DB_PLAYERS_ID: string;
      DB_PLAYERS_RANGE: string;
      DISCORD_URL: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      USER_COOKIE: string;
      SECRET_KEY: string;
    }
  }
}