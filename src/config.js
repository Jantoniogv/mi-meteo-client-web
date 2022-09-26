const PORT_SERVER = process.env.PORT || 3977;
const SERVER_URL = "mi-meteo-api-production.up.railway.app" || "localhost";

export const basePath = `https://${SERVER_URL}/api`;
export const apiVersion = "v1";
