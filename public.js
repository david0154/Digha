let hotels = [];
let currentIndex = 0; // Initialize currentIndex to 0

async function fetchHotels() {
  try {
    const snapshot = await db.collection("hotels").get();

    if (snapshot.empty) {
      // No hotels found in the collection
      console.log("No hotel data found in Firestore.");
      document.getElementById("hotelDisplay").innerHTML = "<p>No hotels found. Please add data to your 'hotels' collection in Firestore.</p>";
      // Optionally disable buttons if there are no hotels
      document.querySelector('button[onclick="prevHotel()"]').disabled = true;
      document.querySelector('button[onclick="nextHotel()"]').disabled = true;
      return; // Exit the function
    }

    hotels = snapshot.docs.map(doc => doc.data());
    // Ensure currentIndex is valid if hotels array changes dynamically (e.g., after initial load)
    currentIndex = 0; // Always start from the first hotel after a fetch
    showHotel(currentIndex); // Display the first hotel

    // Enable buttons once data is loaded (if they were disabled)
    document.querySelector('button[onclick="prevHotel()"]').disabled = false;
    document.querySelector('button[onclick="nextHotel()"]').disabled = false;

  } catch (error) {
    // Catch any errors during the Firebase fetch operation
    console.error("Error fetching hotels:", error);
    document.getElementById("hotelDisplay").innerHTML = `<p>Error loading hotels: ${error.message}. Please check your Firebase configuration and security rules.</p>`;
    // Disable buttons on error
    document.querySelector('button[onclick="prevHotel()"]').disabled = true;
    document.querySelector('button[onclick="nextHotel()"]').disabled = true;
  }
}

function showHotel(indexToShow) {
  if (hotels.length === 0) {
    // This case should ideally be caught by fetchHotels(), but good to have a fallback
    document.getElementById("hotelDisplay").innerHTML = "<p>No hotels available to display.</p>";
    // Also disable buttons if this scenario occurs unexpectedly
    document.querySelector('button[onclick="prevHotel()"]').disabled = true;
    document.querySelector('button[onclick="nextHotel()"]').disabled = true;
    return;
  }

  // Ensure the index is within the valid bounds of the hotels array
  if (indexToShow < 0) {
    currentIndex = 0; // Go to the first hotel if trying to go before start
  } else if (indexToShow >= hotels.length) {
    currentIndex = hotels.length - 1; // Go to the last hotel if trying to go past end
  } else {
    currentIndex = indexToShow; // Set current index to the requested index
  }

  const h = hotels[currentIndex];
  const container = document.getElementById("hotelDisplay");

  container.innerHTML = `
    <h3>${h.name || 'Hotel Name N/A'}</h3>
    <p>${h.address || 'Address N/A'}</p>
    <p><b>Mobile:</b> ${h.mobile || 'N/A'}</p>
    <p><b>WhatsApp:</b> ${h.whatsapp || 'N/A'}</p>
    <p><b>Email:</b> ${h.email || 'N/A'}</p>
    <p><b>Price Range:</b> ${h.price_range || 'N/A'}</p>
    <p><b>AC Room:</b> ${h.ac_price || 'N/A'}</p>
    <p><b>Non-AC Room:</b> ${h.non_ac_price || 'N/A'}</p>
    ${h.image1 ? `<img src="${h.image1}" alt="Hotel Photo 1">` : ''}
    ${h.image2 ? `<img src="${h.image2}" alt="Hotel Photo 2">` : ''}
  `;

  // Disable/enable buttons based on current index
  document.querySelector('button[onclick="prevHotel()"]').disabled = (currentIndex === 0);
  document.querySelector('button[onclick="nextHotel()"]').disabled = (currentIndex === hotels.length - 1);
}

function nextHotel() {
  if (currentIndex < hotels.length - 1) {
    showHotel(currentIndex + 1); // Pass the next index directly
  }
}

function prevHotel() {
  if (currentIndex > 0) {
    showHotel(currentIndex - 1); // Pass the previous index directly
  }
}

// Initial call to fetch data when the script loads
fetchHotels();
