const PORT_SERVER = process.env.PORT || 3977;
//const SERVER_URL = "mimeteoweb.up.railway.app";
const SERVER_URL = "localhost";

export const basePath = `http://${SERVER_URL}:${PORT_SERVER}/api`;
//export const basePath = `https://${SERVER_URL}/api`;
export const apiVersion = "v1";
