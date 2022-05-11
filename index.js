let outerArray = [];

const filterBooks = (event) => {
  const query = event.target.value;
  const select = document.querySelector("select");
  console.log(select.value);
  const filteredBooks = outerArray.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) &&
      book.category.toLowerCase().includes(select.value.toLowerCase())
  );
  renderBooks(filteredBooks);
};

const loadBooks = async () => {
  try {
    const response = await fetch(
      "https://be-strive-bookstore.herokuapp.com/books"
    );
    const parsedBody = await response.json();
    const { data: books } = parsedBody;
    bookToRemoveIdx = books.findIndex((book) => book.price === null);
    books.splice(bookToRemoveIdx, 1);
    outerArray = [...books];
    renderBooks(books);
  } catch (err) {
    console.log(err);
  }
  console.log("HERE");
};

const selectCategory = (event) => {
  const option = event.target.value;
  const filteredBooks = outerArray.filter((book) =>
    book.category.toLowerCase().includes(option.toLowerCase())
  );
  renderBooks(filteredBooks);
};

window.onload = () => {
  loadBooks();
  document.querySelector("input").addEventListener("change", filterBooks);
  document.querySelector("select").addEventListener("change", selectCategory);
};

const renderBooks = (books) => {
  const row = document.querySelector(".row");
  row.innerHTML = "";
  if (Array.isArray(books)) {
    books.forEach((book, index) => {
      const col = document.createElement("div");
      col.className = "col-6 col-sm-4 col-md-6 col-lg-4 mb-2 px-2";
      col.innerHTML = `<div class="card">
                            <img src=${book.img} class="card-img-top" alt="...">
                            <div class="card-body pl-2">
                            <small class="text-muted font-weight-bold">Id: ${book.asin}</small>
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">${book.category}</p>
                                <p class="card-text">$${book.price}</p>

                                <button class="btn btn-info col-7 addToCart">ADD TO CART</button>
                                <button class="btn btn-primary col-4 skipBtn">SKIP</button>
                            </div>
                        </div>`;

      row.appendChild(col);
      addToCart(book.img, book.asin, book.price, book.title);
      skipBtn();
    });
  } else {
    alert("provide a valid array");
  }
};
let cartBody = document.querySelector(".cart-body");

console.log(cartBody);
let addToCart = (img, asin, price, title) => {
  let hideBtn = document.querySelectorAll("button.addToCart");
  hideBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let li = document.createElement("li");
      li.classList.add("cart-item");

      li.innerHTML = ` <div class="justify-content-between"><img class="cart-img" src="${img}">
                        <h5 class="card-text font-weight-bold pt-2">$ ${price}</h5></div>
                      <div class="card-title text-right">
                      <h5 class="card-title">${title}</h5>
                        <p class="card-text">id: ${asin}</p>
                      </div>
                    `;

      cartBody.appendChild(li);
      e.target.parentElement.parentElement.parentElement.classList.add(
        "bg-secondary"
      );
    });
    return;
  });
};

let skipBtn = () => {
  let skipBtn = document.querySelectorAll("button.skipBtn");
  skipBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.classList.add(
        "d-none"
      );
    });
  });
};
