let hotels = [];
let currentIndex = 0;

async function fetchHotels() {
  try {
    const snapshot = await db.collection("hotels").get();
    if (snapshot.empty) {
      document.getElementById("hotelDisplay").innerHTML = "<p>No hotel found.</p>";
      return;
    }
    hotels = snapshot.docs.map(doc => doc.data());
    showHotel(0);
  } catch (err) {
    document.getElementById("hotelDisplay").innerHTML = "<p>Error: " + err.message + "</p>";
  }
}

function showHotel(index) {
  if (hotels.length === 0) return;
  currentIndex = Math.max(0, Math.min(index, hotels.length - 1));
  const h = hotels[currentIndex];
  document.getElementById("hotelDisplay").innerHTML = `
    <h3>${h.name || 'N/A'}</h3>
    <p>${h.address || 'N/A'}</p>
    <p><b>Mobile:</b> ${h.mobile || 'N/A'}</p>
    <p><b>WhatsApp:</b> ${h.whatsapp || 'N/A'}</p>
    <p><b>Email:</b> ${h.email || 'N/A'}</p>
    <p><b>AC Room:</b> ₹${h.ac_price || 'N/A'}</p>
    <p><b>Non-AC Room:</b> ₹${h.non_ac_price || 'N/A'}</p>
    <p><b>Price Range:</b> ${h.price_range || 'N/A'}</p>
    ${h.image1 ? `<img src="${h.image1}" style="max-width:300px;">` : ''}
    ${h.image2 ? `<img src="${h.image2}" style="max-width:300px;">` : ''}
  `;
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

window.onload = fetchHotels;
