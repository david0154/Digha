let hotels = [];
let currentIndex = 0;

async function fetchHotels() {
  try {
    const snapshot = await db.collection("hotels").get();

    if (snapshot.empty) {
      console.log("No hotel data found in Firestore.");
      document.getElementById("hotelDisplay").innerHTML = "<p>No hotels found. Please add hotel documents to your 'hotels' collection.</p>";
      document.querySelector('button[onclick="prevHotel()"]').disabled = true;
      document.querySelector('button[onclick="nextHotel()"]').disabled = true;
      return;
    }

    hotels = snapshot.docs.map(doc => doc.data());
    currentIndex = 0;
    showHotel(currentIndex);

    document.querySelector('button[onclick="prevHotel()"]').disabled = false;
    document.querySelector('button[onclick="nextHotel()"]').disabled = false;

  } catch (error) {
    console.error("Error fetching hotels:", error);
    document.getElementById("hotelDisplay").innerHTML = `<p>Error loading hotels: ${error.message}</p>`;
    document.querySelector('button[onclick="prevHotel()"]').disabled = true;
    document.querySelector('button[onclick="nextHotel()"]').disabled = true;
  }
}

function showHotel(indexToShow) {
  if (hotels.length === 0) {
    document.getElementById("hotelDisplay").innerHTML = "<p>No hotels available to display.</p>";
    document.querySelector('button[onclick="prevHotel()"]').disabled = true;
    document.querySelector('button[onclick="nextHotel()"]').disabled = true;
    return;
  }

  if (indexToShow < 0) {
    currentIndex = 0;
  } else if (indexToShow >= hotels.length) {
    currentIndex = hotels.length - 1;
  } else {
    currentIndex = indexToShow;
  }

  const h = hotels[currentIndex];
  const container = document.getElementById("hotelDisplay");

  container.innerHTML = `
    <h3>${h.name || 'Hotel Name N/A'}</h3>
    <p>${h.address || 'Address N/A'}</p>
    <p><b>Mobile:</b> ${h.mobile || 'N/A'}</p>
    <p><b>WhatsApp:</b> ${h.whatsapp || 'N/A'}</p>
    <p><b>Email:</b> ${h.email || 'N/A'}</p>
    <p><b>AC Room Price:</b> ₹${h.ac_min_price || 'N/A'} – ₹${h.ac_max_price || 'N/A'}</p>
    <p><b>Non-AC Room Price:</b> ₹${h.non_ac_min_price || 'N/A'} – ₹${h.non_ac_max_price || 'N/A'}</p>
    ${h.image1 ? `<img src="${h.image1}" alt="Hotel Image 1" style="width:100%;max-width:300px;border-radius:10px;margin:10px 0;">` : ''}
    ${h.image2 ? `<img src="${h.image2}" alt="Hotel Image 2" style="width:100%;max-width:300px;border-radius:10px;margin:10px 0;">` : ''}
  `;

  document.querySelector('button[onclick="prevHotel()"]').disabled = (currentIndex === 0);
  document.querySelector('button[onclick="nextHotel()"]').disabled = (currentIndex === hotels.length - 1);
}

function nextHotel() {
  if (currentIndex < hotels.length - 1) {
    showHotel(currentIndex + 1);
  }
}

function prevHotel() {
  if (currentIndex > 0) {
    showHotel(currentIndex - 1);
  }
}

fetchHotels();
