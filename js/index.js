const loadAllPhones = async (status = false, searchInput = "") => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  try {
    const apiData = await fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchInput || "iphone"}`
    );
    const data = await apiData.json();
    const phones = data.data;

    if (phones.length === 0) {
      displayNoResults();
    } else if (status) {
      displayAllPhone(phones);
    } else {
      displayAllPhone(phones.slice(0, 6));
    }
  } catch (error) {
    console.error("Failed to fetch phones:", error);
  } finally {
    spinner.style.display = "none";
  }
};

const displayAllPhone = (phones) => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerHTML = ""; // Clear previous results

  for (const phone of phones) {
    const phoneCard = document.createElement("div");
    phoneCard.innerHTML = `
        <div class="card py-6 bg-base-100 shadow-xl">
          <figure>
            <img src=${phone.image || "fallback-image-url.jpg"} alt="${phone.phone_name}" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">
              ${phone.phone_name}
              <div class="badge badge-secondary">NEW</div>
            </h2>
            <p>Buy iPhone in Bangladesh from iHub. Discover the latest iPhones at iHub Bangladesh! Get unbeatable deals on the most advanced Apple smartphones with sleek designs, powerful performance, and cutting-edge features.</p>
            <div>
              <p class="card-title"><i class="fa-solid fa-dollar-sign"></i>${phone.price || "999"}</p>
            </div>
            <div class="card-actions justify-end">
              <button class="btn" onclick="phoneDetails('${phone.slug}')" onclick="handleDetails('${phone.slug}')">Details</button>
            </div>
          </div>
        </div>`;
    phonesContainer.appendChild(phoneCard);
  }
};

const displayNoResults = () => {
  const phonesContainer = document.getElementById("phone-container");
  phonesContainer.innerHTML = "<p>No phones found.</p>";
};

const handleDetails = (phoneSlug) => {
  console.log(`Show details for phone with slug: ${phoneSlug}`);
  // Fetch or display additional phone details (e.g., show a modal or navigate to a new page).
};

const handleShowAll = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";

  setTimeout(() => {
    loadAllPhones(true);
  }, 3000); // Reduced timeout duration
};

const handleSearch = () => {
  const searchInput = document.getElementById("search-input").value;
  loadAllPhones(false, searchInput);
};
const phoneDetails = async (slugs) => {
  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
    const data = await response.json();
    const { brand, image, slug, name, releaseDate, mainFeatures, phone_name} = data.data;
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = ""; // Clear previous modal content
    const modalShow = document.createElement("div");
    modalShow.innerHTML = `
      <dialog id="my_modal_4" class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
          <div class="mx-auto flex justify-center items-center">
            <img src="${image || "fallback-image-url.jpg"}" alt="${phone_name}" />
          </div>
          <div class="card-body">
            <h2 class="card-title">${name}</h2>
            <p><strong>Main Features:</strong> ${mainFeatures.storage ? mainFeatures.storage : "Not available"}</p>
            <p><strong>Display Size:</strong> ${mainFeatures.displaySize ? mainFeatures.displaySize : "Not available"}</p>
            <p> <strong>Chip Set:</strong> ${mainFeatures.chipSet ? mainFeatures.chipSet : "Not available"}</p>
            <p><strong>Memory:</strong> ${mainFeatures.memory ? mainFeatures.memory : "Not available"}</p>
            <p><strong>Slug:</strong> ${slug ? slug : "Not available"}</p>
            <p><strong>Brand:</strong> ${brand || "Brand not available"}</p>
            <p><strong>Release Date:</strong> ${releaseDate || "Release date not available"}</p>
          </div>
          <div class="modal-action">
            <button class="btn" onclick="document.getElementById('my_modal_4').close()">Close</button>
          </div>
        </div>
      </dialog>`;
    modalContainer.appendChild(modalShow);

    const dialog = document.getElementById("my_modal_4");
    dialog.showModal();
  } catch (error) {
    console.error("Failed to fetch phone details:", error);
  }
};
// Load initial phones
loadAllPhones();
