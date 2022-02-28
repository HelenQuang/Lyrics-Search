const searchEl = document.getElementById("search");
const resultEl = document.getElementById("result");
const moreEl = document.getElementById("more");
const formEl = document.getElementById("form");

// Event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = searchEl.value.trim();

  if (!searchTerm) {
    alert("Please type in a search term");
  } else {
    searchSongs(searchTerm);
  }
});

// Search by song or artist or lyrics
async function searchSongs(term) {
  const res = await fetch(`https://genius.p.rapidapi.com/search?q=${term}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "genius.p.rapidapi.com",
      "x-rapidapi-key": "4536126de6msh4930123a1a87c21p1e620ajsn29baca5b2d25",
    },
  });
  const data = await res.json();
  console.log(data);
  showData(data);
}

// Display results to DOM
function showData(data) {
  resultEl.innerHTML = `
    <ul class="songs">
      ${data.response.hits
        .map(
          (song) => `
          <li>
            <span><strong>${song.result.artist_names}</strong> - ${song.result.title}</span>
            <button class="btn">See more</button>
          </li>`
        )
        .join("")}
    </ul>
  `;
}
