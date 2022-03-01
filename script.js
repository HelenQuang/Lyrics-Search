const searchEl = document.getElementById("search");
const resultEl = document.getElementById("result");
const formEl = document.getElementById("form");

// Event listeners
formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchEl.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else searchSongs(searchTerm);
});

// Search by song or artist or lyrics
const searchSongs = async (term) => {
  const res = await fetch(`https://genius.p.rapidapi.com/search?q=${term}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "genius.p.rapidapi.com",
      "x-rapidapi-key": "4536126de6msh4930123a1a87c21p1e620ajsn29baca5b2d25",
    },
  });
  const data = await res.json();

  if (data.response.hits.length === 0) {
    resultEl.innerHTML = `<p>Sorry! There are no search results!</p>`;
    searchEl.value = "";
  } else {
    showData(data);
    searchEl.value = "";
  }
};

// Display results to DOM
const showData = (data) => {
  resultEl.innerHTML = `
    <ul class="songs">
      ${data.response.hits
        .map(
          (song) => `
          <li>
            <span><strong> ${song.result.artist_names}</strong> - ${song.result.title}</span>
            <button class="btn" path=${song.result.url}> See More
            </button>
          </li>`
        )
        .join("")}
    </ul>
  `;
};

//To open See More page
resultEl.addEventListener("click", (e) => {
  if ((e.target.tagName = "BUTTON")) {
    const path = e.target.getAttribute("path");
    window.open(`${path}`, "_blank");
  }
});
