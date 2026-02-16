// =======================================
// GLOBAL STORE FOR TRAVEL DATA
// =======================================
let travelData = {};

// =======================================
// FETCH DATA FROM JSON FILE
// =======================================
fetch("travel_recommendation_api.json")
  .then((response) => response.json())
  .then((data) => {
    travelData = data;
    console.log("Travel data loaded successfully:", travelData);
  })
  .catch((error) => {
    console.error("Failed to load travel data:", error);
  });

// =======================================
// SEARCH FUNCTION (CASE-INSENSITIVE)
// =======================================
function search() {
  const input = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (input === "") {
    resultsDiv.innerHTML =
      "<p class='text-white'>Please enter a search keyword.</p>";
    return;
  }

  if (input.includes("beach")) {
    showResults(travelData.beach);
  } else if (input.includes("temple")) {
    showResults(travelData.temple);
  } else if (input.includes("country")) {
    showResults(travelData.country);
  } else {
    resultsDiv.innerHTML = "<p class='text-white'>No results found.</p>";
  }
}

// =======================================
// DISPLAY SEARCH RESULTS (RIGHT PANEL)
// =======================================
function showResults(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");

    card.className = "bg-white rounded-xl overflow-hidden shadow-xl";

    card.innerHTML = `
      <!-- IMAGE -->
      <img
        src="${item.image}"
        alt="${item.name}"
        class="w-full h-56 object-cover"
      />

      <!-- CONTENT -->
      <div class="p-5 text-black">
        <h3 class="text-lg font-bold mb-2">
          ${item.name}
        </h3>

        <p class="text-gray-600 text-sm mb-4">
          ${item.description}
        </p>

        <button
          class="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition">
          Visit
        </button>
      </div>
    `;

    resultsDiv.appendChild(card);
  });
}

// =======================================
// CLEAR RESULTS FUNCTION
// =======================================
function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("searchInput").value = "";
}
