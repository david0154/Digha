// Load blog list
if (document.getElementById("blogList")) {
  db.collection("blogs").orderBy("date", "desc").onSnapshot(snapshot => {
    let html = "";
    snapshot.forEach(doc => {
      const data = doc.data();
      html += `<div class="blog-card" onclick="loadBlog('${doc.id}')">
        <h3>${data.title}</h3>
        <img src="${data.image}" width="100%" />
        <p>${data.content.substring(0, 100)}...</p>
        <small>${new Date(data.date.toDate()).toLocaleDateString()}</small>
      </div>`;
    });
    document.getElementById("blogList").innerHTML = html;
  });
}

// Load full blog in same page
function loadBlog(id) {
  db.collection("blogs").doc(id).get().then(doc => {
    const data = doc.data();
    document.getElementById("blogList").style.display = "none";
    document.getElementById("blogDetail").style.display = "block";
    document.getElementById("blogDetail").innerHTML = `
      <h1>${data.title}</h1>
      <img src="${data.image}" style="width: 100%; max-width: 600px;" />
      <p>${data.content}</p>

      <!-- Ad Mid -->
      <div class="ad-slot">
        <script type="text/javascript">
          atOptions = { 'key': '4c5d9f559ffd3347761823551a12cf4e', 'format': 'iframe', 'height': 250, 'width': 300, 'params': {} };
        </script>
        <script src="//japaneseexceedinglysanctuary.com/4c5d9f559ffd3347761823551a12cf4e/invoke.js"></script>
      </div>

      <h3>🌐 Translations</h3>
      <p><b>বাংলা:</b> ${data.translations?.bn || 'অনুবাদ পাওয়া যায়নি'}</p>
      <p><b>हिन्दी:</b> ${data.translations?.hi || 'अनुवाद उपलब्ध नहीं है'}</p>

      <a href="hotel.html" class="book-hotel">🛏️ Book a Hotel to Visit Digha</a><br><br>
      <button onclick="goBack()">⬅️ Back to Blog List</button>
    `;
  });
}

function goBack() {
  document.getElementById("blogDetail").style.display = "none";
  document.getElementById("blogList").style.display = "block";
}
