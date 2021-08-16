const baseURL = "https://platzi-avo.vercel.app";

const $app = document.querySelector("#app");
$app.className = "grid gap-4 grid-cols-2 mt-10";

// Event propagation:
$app.addEventListener("click", (e) => {
  if (e.target.nodeName === "H2") {
    alert("Event propagation en acción");
  }
});

// Internacionalization API
const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return newPrice;
};

// Anonymous self-executing function:
!(async function () {
  try {
    const allItems = [];

    const response = await fetch(`${baseURL}/api/avo`);
    const { data: allAvos } = await response.json();

    allAvos.forEach((item) => {
      const image = document.createElement("img");
      image.className =
        "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:ml-6";
      image.src = `${baseURL}${item.image}`;

      const title = document.createElement("h2");
      title.className = "text-lg";
      title.textContent = item.name;

      const price = document.createElement("div");
      price.className = "text-gray-600";
      price.textContent = formatPrice(item.price);

      const priceAndTitle = document.createElement("div");
      priceAndTitle.className = "text-center md:text-left";
      priceAndTitle.append(title, price);

      const card = document.createElement("div");
      card.className = "grid grid-cols-2 bg-gray-200 rounded-xl";
      card.append(image, priceAndTitle);

      allItems.push(card);
    });

    $app.append(...allItems);
  } catch (error) {
    console.log(error);
  }
})();
