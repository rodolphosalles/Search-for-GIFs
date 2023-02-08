const form = document.querySelector("form");
const GIFSContainer = document.querySelector("div");

const APIKey = "FmfMLG7PcmRltc4LcVVXBua6o6Il157b";

const getGIPHYApiUrl = (GIFName) =>
  `https://api.giphy.com/v1/gifs/search?api_key=${APIKey}&limit=1&q=${GIFName}`;

const genereteGIFImg = (downsizeGIFUrl, GIFData) => {
  const img = document.createElement("img");

  img.setAttribute("src", downsizeGIFUrl);
  img.setAttribute("alt", GIFData.data[0].title);
  return img;
};

const fetchGIF = async (inputValue) => {
  try {
    const GIFNameUrl = getGIPHYApiUrl(inputValue);
    const response = await fetch(GIFNameUrl);

    if (!response.ok) {
      throw new Error("Não foi possivel localizar o request");
    }
    return response.json();
  } catch (error) {
    alert(error.message);
  }
};

const insertDivInToDOM = async (inputValue) => {
  const GIFData = await fetchGIF(inputValue);

  if (GIFData) {
    const downsizeGIFUrl = GIFData.data[0].images.downsized.url;
    const img = genereteGIFImg(downsizeGIFUrl, GIFData);
    GIFSContainer.insertAdjacentElement("afterbegin", img);
  }
  form.reset();
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = event.target.search.value;

  insertDivInToDOM(inputValue);
});
