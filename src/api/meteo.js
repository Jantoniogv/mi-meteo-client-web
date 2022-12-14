import { apiVersion, basePath } from "../config";

export function getCurrentMeteoApi(location) {
  const url = `${basePath}/${apiVersion}/current-meteo-dates?location=${location}`;

  const params = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };
  console.log(url);

  return fetch(url, params)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}

///////////////////////////////////////////////////////////////////////////////////////////

export function getFilterMeteoApi(
  typeTime,
  typeQuery,
  startInterval,
  endInterval,
  location
) {
  const req = getReq(typeTime, typeQuery, startInterval, endInterval, location);

  const url = `${basePath}/${apiVersion}/last-24-meteo-dates${req}`;
  const params = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  console.log(url);

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

const getReq = (typeTime, typeQuery, startInterval, endInterval, location) => {
  let req = "?";

  //console.log(typeTime.hour);
  //console.log(typeQuery);

  if (typeQuery.temp) {
    req = req.concat("temp=1");
  } else {
    req = req.concat("temp=0");
  }

  if (typeQuery.tempMax) {
    req = req.concat("&tempMax=1");
  } else {
    req = req.concat("&tempMax=0");
  }

  if (typeQuery.tempMin) {
    req = req.concat("&tempMin=1");
  } else {
    req = req.concat("&tempMin=0");
  }

  if (typeQuery.hum) {
    req = req.concat("&hum=1");
  } else {
    req = req.concat("&hum=0");
  }

  if (typeQuery.pressure) {
    req = req.concat("&pressure=1");
  } else {
    req = req.concat("&pressure=0");
  }

  if (typeQuery.water) {
    req = req.concat("&water=1");
  } else {
    req = req.concat("&water=0");
  }

  if (typeQuery.avg_wind) {
    req = req.concat("&avg_wind=1");
  } else {
    req = req.concat("&avg_wind=0");
  }

  if (typeQuery.max_wind) {
    req = req.concat("&max_wind=1");
  } else {
    req = req.concat("&max_wind=0");
  }

  if (typeQuery.min_wind) {
    req = req.concat("&min_wind=1");
  } else {
    req = req.concat("&min_wind=0");
  }

  if (typeQuery.dir_wind) {
    req = req.concat("&dir_wind=1");
  } else {
    req = req.concat("&dir_wind=0");
  }

  if (typeTime.all) {
    req = req.concat("&time=a");
  } else if (typeTime.hour) {
    req = req.concat("&time=h");
  } else if (typeTime.day) {
    req = req.concat("&time=d");
  } else if (typeTime.month) {
    req = req.concat("&time=m");
  } else if (typeTime.year) {
    req = req.concat("&time=y");
  }

  req = req.concat(
    `&startInterval=${startInterval}&endInterval=${endInterval}&location=${location.toLowerCase()}`
  );
  //console.log(req);

  return req;
};
