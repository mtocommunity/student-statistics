export const site = "https://student-statistics.martindotpy.dev";

export const {
  DEV: isDev,
  DATABASE_URL: databaseUrl,
  JWT_SECRET: jwtSecret,
} = import.meta.env;

export const privateRoutes: RegExp[] = [/^\/$/];

// JWT
export const jwtSecretEncoded = new TextEncoder().encode(jwtSecret);
