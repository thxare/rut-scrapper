const rutScrapper = async (name) => {
  const encodedName = encodeURIComponent(name);
  const data = await fetch("https://www.genealog.cl/Geneanexus/search", {
    headers: {
      accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "accept-language": "es-419,es;q=0.9",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      priority: "u=0, i",
      "sec-ch-ua":
        '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      Referer: "https://www.genealog.cl/Geneanexus/search",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
     body: `value=${encodedName}&ab=false&filter=%7B%22personas%22%3Atrue%2C%22empresas%22%3Atrue%2C%22lugares%22%3Atrue%2C%22argentina%22%3Afalse%2C%22bolivia%22%3Atrue%2C%22chile%22%3Atrue%2C%22colombia%22%3Atrue%2C%22guatemala%22%3Atrue%2C%22mexico%22%3Atrue%2C%22venezuela%22%3Afalse%7D`,
    method: "POST",
  });
  return data.text();
};

const getData = (data) => {
  const resultLine = data.match(/var result = \{.*?\};/);

  if (resultLine) {
    const jsonStr = resultLine[0].replace("var result = ", "").replace(";", "");
    const resultJson = JSON.parse(jsonStr);
    console.log(resultJson.content);
  } else {
    console.log("No se encontró la línea result.");
  }
};

rutScrapper("nombre").then((response) => getData(response));
