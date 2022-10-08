const priceById = (id) => {
  return Math.max(Math.round(Number(id) / 100), 1000) / 100;
}

const parseApiData = (apiData, type, args) => {
  switch(type) {
    case "app":
      if (apiData) {
        let hotGames = [];
        console.log('api data', apiData)
        const numberOfItems = apiData.getElementsByTagName("item").length;
        const hotGamesItems = apiData.getElementsByTagName("item").length > 0
          ? apiData.getElementsByTagName("item")
          : null
        const hotGamesNames = apiData.getElementsByTagName("name").length > 0
          ? apiData.getElementsByTagName("name")
          : null
        const hotGamesThumbs = apiData.getElementsByTagName("thumbnail").length > 0
          ? apiData.getElementsByTagName("thumbnail")
          : null
        for (let i = 0; i < numberOfItems; i++) {
          hotGames[i] = {
            id: hotGamesItems[i].getAttribute("id"),
            name: hotGamesNames[i].getAttribute("value"),
            thumb: hotGamesThumbs[i].getAttribute("value"),
            price: priceById(hotGamesItems[i].getAttribute("id"))
          }
        }
        console.log('hot games', hotGames);
        return hotGames;
      } else return [];
    case "search":
      if(apiData) {
        let searchedGames = [];
        let searchResults = apiData.getElementsByTagName("item").length;
        console.log('api data', apiData)
        const itemLimit = Math.min(apiData.getElementsByTagName("item").length, 50);
        for (let i = 0; i < itemLimit; i++) {
          searchedGames[i] = {
            name: apiData.getElementsByTagName("name")[i].getAttribute("value"),
            type: apiData.getElementsByTagName("item")[i].getAttribute("type"),
            id: apiData.getElementsByTagName("item")[i].getAttribute("id"),
            price: priceById(apiData.getElementsByTagName("item")[i].getAttribute("id"))
          }
        }
        console.log('searchedGames', searchedGames);
        return [ searchedGames, searchResults ];
      } else return [ [], 0 ];
    case "home":
      if(apiData) {
        let games = [];
        console.log('api data', apiData)
        const numberOfItems = apiData.getElementsByTagName("item").length;
        const gameItems = apiData.getElementsByTagName("item").length > 0
          ? apiData.getElementsByTagName("item")
          : null
        const gameImages = apiData.getElementsByTagName("image").length > 0
          ? apiData.getElementsByTagName("image")
          : null
        for (let i = 0; i < numberOfItems; i++) {
          games[i] = {
            id: gameItems[i].getAttribute("id"),
            image: gameImages[i].childNodes[0].nodeValue
          }
        }
        console.log('featured games', games);
        return games;
      } else return [];
    case "product":
      if (apiData) {
        let game = null;
        console.log('api data', apiData)
        if(apiData.getElementsByTagName("item").length === 0) return null;
        const productId = apiData.getElementsByTagName("item").length > 0
          ? apiData.getElementsByTagName("item")[0].getAttribute("id")
          : null
        const productName = apiData.getElementsByTagName("name").length > 0
          ? apiData.getElementsByTagName("name")[0].getAttribute("value")
          : null
        const productImage = apiData.getElementsByTagName("image").length > 0
          ? apiData.getElementsByTagName("image")[0].childNodes[0].nodeValue
          : null
        const productThumb = apiData.getElementsByTagName("thumbnail").length > 0
          ? apiData.getElementsByTagName("thumbnail")[0].childNodes[0].nodeValue
          : null
        const productDesc = apiData.getElementsByTagName("description").length > 0
          ? apiData.getElementsByTagName("description")[0].childNodes[0].nodeValue
          : null
        game = {
          id: productId,
          name: productName,
          image: productImage,
          thumb: productThumb,
          desc: productDesc,
          price: priceById(args)
        };
        console.log('product', game);
        return game;
      } else return null;
  }
}

export default parseApiData;
