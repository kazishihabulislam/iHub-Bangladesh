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
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
  const data = await response.json();
  const {brand, image, slug, name, releaseDate, mainFeatures, phone_name} = data.data;
  // my_modal_1.showModal()
  const modalContainer = document.getElementById("modal-container");
    const modalShow = document.createElement('div');
    modalShow.innerHTML = `<dialog id="my_modal_1" class="modal">
    <div class="modal-box">
      <div class="mx-auto flex justify-center items-center bg-blue-200">
        <img src=${image || "fallback-image-url.jpg"} alt="${phone_name}" />
      </div>
      <div class="card-body">
       <h2 class="card-title">
  
        <div class="badge badge-secondary">NEW</div>
        </h2>
              <p>Buy iPhone in Bangladesh from iHub. Discover the latest iPhones at iHub Bangladesh! Get unbeatable deals on the most advanced Apple smartphones with sleek designs, powerful performance, and cutting-edge features.</p>
              <div>
                <p class="card-title"><i class="fa-solid fa-dollar-sign"></i></p>
              </div>
              <div class="card-actions justify-end">
              </div>
            </div>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>`;
  modalContainer.appendChild(modalShow);
my_modal_1.showModal();
};


// Load initial phones
loadAllPhones();
