import { apiVersion, basePath } from "./config";

/* export function singUpApi(data) {
  const url = `${basePath}/${apiVersion}/sing-up`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };
  //console.log(data);

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      if (result.user) {
        return {
          ok: true,
          message: "Usuario creado correctamente",
        };
      }
      return {
        ok: false,
        message: result.message,
      };
    })
    .catch((err) => {
      return {
        ok: false,
        message: err.message,
      };
    });
}

export function singInApi(data) {
  const url = `${basePath}/${apiVersion}/sing-in`;
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
} */

export function getLast24MeteoApi(typeTime, typeQuery) {
  const req = getReq(typeTime, typeQuery);

  const url = `${basePath}/${apiVersion}/last-24-meteo-dates${req}`;
  const params = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      //console.log(result);
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

/* export function getUsersActiveApi(token, status) {
  const url = `${basePath}/${apiVersion}/users-active?active=${status}`;
  const params = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function uploadAvatarApi(token, avatar, userId) {
  const url = `${basePath}/${apiVersion}/upload-avatar/${userId}`;

  const formData = new FormData();
  //console.log(avatar);
  formData.append("avatar", avatar);

  const params = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function getAvatarApi(avatarName) {
  const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`;

  return fetch(url)
    .then((response) => {
      return response.url;
    })
    .catch((err) => {
      return err.message;
    });
}

export function updateUserApi(token, user, userId) {
  const url = `${basePath}/${apiVersion}/update-user/${userId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(user),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}
 */

const getReq = (typeTime, typeQuery) => {
  let req;

  console.log(typeTime.hour);
  //console.log(typeQuery);

  if (
    typeQuery.temp &&
    typeQuery.hum &&
    typeQuery.pressure &&
    typeQuery.water
  ) {
    req = "?temp=1&hum=1&pressure=1&water=1";
  } else if (
    typeQuery.temp &&
    !typeQuery.hum &&
    !typeQuery.pressure &&
    !typeQuery.water
  ) {
    req = "?temp=1&hum=0&pressure=0&water=0";
  } else if (
    typeQuery.temp &&
    typeQuery.hum &&
    !typeQuery.pressure &&
    !typeQuery.water
  ) {
    req = "?temp=1&hum=1&pressure=0&water=0";
  } else if (
    typeQuery.temp &&
    typeQuery.hum &&
    typeQuery.pressure &&
    !typeQuery.water
  ) {
    req = "?temp=1&hum=1&pressure=1&water=0";
  } else if (
    typeQuery.temp &&
    !typeQuery.hum &&
    typeQuery.pressure &&
    !typeQuery.water
  ) {
    req = "?temp=1&hum=0&pressure=1&water=0";
  } else if (
    typeQuery.temp &&
    !typeQuery.hum &&
    !typeQuery.pressure &&
    typeQuery.water
  ) {
    req = "?temp=1&hum=0&pressure=0&water=1";
  } else if (
    !typeQuery.temp &&
    typeQuery.hum &&
    !typeQuery.pressure &&
    !typeQuery.water
  ) {
    req = "?temp=0&hum=1&pressure=0&water=0";
  } else if (
    !typeQuery.temp &&
    typeQuery.hum &&
    typeQuery.pressure &&
    !typeQuery.water
  ) {
    req = "?temp=0&hum=1&pressure=1&water=0";
  } else if (
    !typeQuery.temp &&
    typeQuery.hum &&
    typeQuery.pressure &&
    typeQuery.water
  ) {
    req = "?temp=0&hum=1&pressure=1&water=1";
  } else if (
    !typeQuery.temp &&
    typeQuery.hum &&
    !typeQuery.pressure &&
    typeQuery.water
  ) {
    req = "?temp=0&hum=1&pressure=0&water=1";
  } else if (
    !typeQuery.temp &&
    !typeQuery.hum &&
    typeQuery.pressure &&
    !typeQuery.water
  ) {
    req = "?temp=0&hum=0&pressure=1&water=0";
  } else if (
    !typeQuery.temp &&
    !typeQuery.hum &&
    typeQuery.pressure &&
    typeQuery.water
  ) {
    req = "?temp=0&hum=0&pressure=1&water=1";
  } else if (
    !typeQuery.temp &&
    !typeQuery.hum &&
    !typeQuery.pressure &&
    typeQuery.water
  ) {
    req = "?temp=0&hum=0&pressure=1&water=1";
  }

  if (typeTime.all) {
    req = req.concat("time=a");
  } else if (typeTime.hour) {
    req = req.concat("time=h");
  } else if (typeTime.day) {
    req = req.concat("time=d");
  } else if (typeTime.mouth) {
    req = req.concat("time=m");
  } else if (typeTime.year) {
    req = req.concat("time=y");
  }

  console.log(req);

  return req;
};
