const newBookBtn = document.querySelector(".add-book-btn");
const bookFormDialog = document.querySelector("dialog");
const bookFormElement = document.querySelector("form");
const closeFormButton = document.querySelector(".add-book-close-btn");
const booksContainer = document.querySelector(".books-container");
const testBookAddButton = document.querySelector(".add-testbook");
const library = [];



const bookObject = {
    changeBookReadStatus: function() {
        if (this.bookReadAlready === "Yes") {
            this.bookReadAlready = "No";
        } else {
            this.bookReadAlready = "Yes";
        }
        console.log(library)
    }
};
function createBook(bookTitle, bookAuthor, bookPages, bookReadAlready) {
  this.bookTitle = bookTitle;
  this.bookAuthor = bookAuthor;
  this.bookPages = bookPages;
  this.bookReadAlready = bookReadAlready;
  this.id = crypto.randomUUID();
  Object.setPrototypeOf(this, bookObject);
}
function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookReadAlready) {
  let book = new createBook(bookTitle, bookAuthor, bookPages, bookReadAlready);
  library.push(book);
  createBookCard(book);
  console.log(library);
  return library;
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "Yes");
addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 398, "Yes");
addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 327, "Yes");

function createBookCard(book) {
  console.log("Create book card");

  let bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.id = book.id;
  booksContainer.appendChild(bookCard);

  let bookTitle = document.createElement("p");
  bookTitle.classList.add("book-title");
  bookTitle.textContent = book.bookTitle;
  bookCard.appendChild(bookTitle);

  let bookAuthor = document.createElement("p");
  bookAuthor.classList.add("book-author");
  bookAuthor.textContent = "by " + book.bookAuthor;
  bookCard.appendChild(bookAuthor);

  let bookPages = document.createElement("p");
  bookPages.classList.add("book-pages");
  bookPages.textContent = book.bookPages + " pages";
  bookCard.appendChild(bookPages);

	let bookCardButtonsContainer = document.createElement("div");
	bookCardButtonsContainer.classList.add("book-card-buttons-container");
	bookCard.appendChild(bookCardButtonsContainer);

  let bookReadButton = document.createElement("button");
  bookReadButton.classList.add("book-read-button");
  if (book.bookReadAlready === "Yes") {
    bookReadButton.classList.add("read-button");
    bookReadButton.textContent = "Read";
  } else {
    bookReadButton.classList.add("read-button");
    bookReadButton.textContent = "Unread";
  }
  bookReadButton.addEventListener("click", () => {
    book.changeBookReadStatus();
    if (bookReadButton.classList.contains("read-button")) {
			bookReadButton.classList.remove("read-button");
      bookReadButton.classList.add("unread-button");
      bookReadButton.textContent = "Unread";
    } else {
			bookReadButton.classList.remove("unread-button");
      bookReadButton.classList.add("read-button");
      bookReadButton.textContent = "Read";
    }
  });
  bookCardButtonsContainer.appendChild(bookReadButton);

  let bookRemoveButton = document.createElement("button");
  bookRemoveButton.classList.add("book-card-remove-button");
  bookRemoveButton.textContent = "Remove";
	bookRemoveButton.addEventListener("click", () => {
		bookCard.remove();
		library.splice(library.indexOf(book), 1);
		console.log(library);
	});
	bookCardButtonsContainer.appendChild(bookRemoveButton);
}

newBookBtn.addEventListener("click", () => {
  bookFormDialog.showModal();
});

closeFormButton.addEventListener("click", () => {
  console.log("close");
  bookFormDialog.close();
});

testBookAddButton.addEventListener("click", () => {
  addBookToLibrary("The Return of the King", "J.R.R. Tolkien", 416, "Yes");
});
bookFormElement.addEventListener("submit", (event) => {
  let bookTitle = document.querySelector("#book-title").value;
  let bookAuthor = document.querySelector("#book-author").value;
  let bookPages = document.querySelector("#book-pages").value;
  let bookReadAlreadyElement = document.querySelector("#book-read-already");
  if (bookReadAlreadyElement.checked) {
    bookReadAlready = "Yes";
  } else {
    bookReadAlready = "No";
  }
  addBookToLibrary(bookTitle, bookAuthor, bookPages, bookReadAlready);
  event.preventDefault();
  bookFormDialog.close();
});
