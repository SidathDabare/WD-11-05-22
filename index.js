let outerArray = [];

const filterBooks = (event) => {
  const query = event.target.value;

  const select = document.querySelector("select");

  console.log(select.value);

  // fetch("https://striveschool-api.herokuapp.com/books")
  //     .then(response => response.json())
  //     .then(books => {

  //         const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query.toLowerCase()))
  //         console.log(filteredBooks)
  //         renderBooks(filteredBooks)
  //     })

  const filteredBooks = outerArray.filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) &&
      book.category.toLowerCase().includes(select.value.toLowerCase())
  );
  renderBooks(filteredBooks);
};

const loadBooks = async () => {
  // fetch("https://striveschool-api.herokuapp.com/books")
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

  // fetch("https://be-strive-bookstore.herokuapp.com/books")
  // .then(response => response.json())
  // .then(({ data: books }) => {
  //     bookToRemoveIdx = books.findIndex(book => book.price === null)
  //     books.splice(bookToRemoveIdx, 1)

  //     outerArray = [...books]
  //     renderBooks(books)
  // })
  // .catch(err => console.log(err))
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
    books.forEach((book) => {
      const col = document.createElement("div");
      col.className = "col-md-3 mb-2 px-2";
      col.innerHTML = `<div class="card">
                            <img src=${book.img} class="card-img-top" alt="...">
                            <div class="card-body pl-2">
                            <small class="text-muted font-weight-bold">Id: ${book.asin}</small>
                                <h5 class="card-title">${book.title}</h5>
                                <p class="card-text">${book.category}</p>
                                <p class="card-text">$${book.price}</p>

                                <button class="btn btn-info col-7 addToCart">ADD TO CART</button>
                                <button class="btn btn-primary col-4 skipBtn" onclick="skipBtn()">SKIP</button>
                            </div>
                        </div>`;
      addToCart();
      skipBtn();
      row.appendChild(col);
    });

    // row.innerHTML = books.map((book) => `<div class="col-md-3 mb-2 px-2">
    //                                         <div class="card">
    //                                             <img src=${book.img} class="card-img-top" alt="...">
    //                                             <div class="card-body">
    //                                                 <h5 class="card-title">${book.title}</h5>
    //                                                 <p class="card-text">${book.category}</p>
    //                                                 <a href="#" class="btn btn-primary">$${book.price}</a>
    //                                             </div>
    //                                         </div>
    //                                     </div>`).join("")
  } else {
    alert("provide a valid array");
  }
};
let addCount = 0;
let addToCart = () => {
  let hideBtn = document.querySelectorAll("button.addToCart");
  for (let i = 0; i < hideBtn.length; i++) {
    const button = hideBtn[i];
    button.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.classList.add(
        "bg-danger"
      );
    });
  }
  addCount + 1;
};

let skipBtn = () => {
  let skipBtn = document.querySelectorAll("button.skipBtn");
  for (let i = 0; i < skipBtn.length; i++) {
    const button = skipBtn[i];
    button.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.remove();
    });
  }
};
