require("dotenv").config();

const axios = require("axios");

async function getSearchedIcons(req, res, next) {
  try {
    const options = {
      method: "GET",
      url: "https://api.iconfinder.com/v4/icons/search",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.ICON_SEARCH_API_KEY}`,
      },
      params: {
        query: "book",
        count: "10",
        premium: "false",
        style: "outline",
      },
    };

    const foundIconsResponse = await axios(options);

    const foundIcons = foundIconsResponse.data?.icons;

    let iconData;

    if (!foundIcons) {
      return res.status(200).json({
        message: "No icon found",
      });
    }

    // iconData = foundIcons.map((iconObj) => {
    //   iconObj.
    // });

    return res.status(200).json(foundIconsResponse.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
}

module.exports = getSearchedIcons;
