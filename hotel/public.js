let hotels = [], currentIndex = 0;

async function fetchHotels() {
  const snapshot = await db.collection("hotels").get();
  hotels = snapshot.docs.map(doc => doc.data());
  showHotel(0);
}

function showHotel(index) {
  if (hotels.length === 0) return;
  const h = hotels[index];
  const container = document.getElementById("hotelDisplay");
  container.innerHTML = `
    <h3>${h.name}</h3>
    <p>${h.address}</p>
    <p><b>Mobile:</b> ${h.mobile || 'N/A'}</p>
    <p><b>WhatsApp:</b> ${h.whatsapp || 'N/A'}</p>
    <p><b>Email:</b> ${h.email || 'N/A'}</p>
    <p><b>Price Range:</b> ${h.price_range}</p>
    <p><b>AC Room:</b> ${h.ac_price}</p>
    <p><b>Non-AC Room:</b> ${h.non_ac_price}</p>
    <img src="${h.image1}" alt="Hotel Photo 1">
    <img src="${h.image2}" alt="Hotel Photo 2">
  `;
}

function nextHotel() {
  if (currentIndex < hotels.length - 1) {
    currentIndex++;
    showHotel(currentIndex);
  }
}

function prevHotel() {
  if (currentIndex > 0) {
    currentIndex--;
    showHotel(currentIndex);
  }
}

fetchHotels();
