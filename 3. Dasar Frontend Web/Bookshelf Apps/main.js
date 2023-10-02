const books = [];
const RENDER_EVENT = 'render-book';

function generateId() {
    return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year,
        isComplete
    }
}

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function makeBook(bookObject) {
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = "Penulis : " + bookObject.author;

    const bookYear = document.createElement('p');
    bookYear.innerText = "Terbit : " + bookObject.year;

    const buttonChange = document.createElement('button');
    buttonChange.innerText = "Pindah Rak";

    buttonChange.addEventListener('click', function () {
        moveShelves(bookObject.id);
    });

    const buttonDelete = document.createElement('button');
    buttonDelete.innerText = "Hapus Buku";

    buttonDelete.addEventListener('click', function () {
        deleteBook(bookObject.id);
    });

    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-wrapper');
    buttonWrapper.append(buttonDelete, buttonChange);

    const container = document.createElement('div');
    container.classList.add('book');
    container.append(bookTitle, bookAuthor, bookYear, buttonWrapper);
    container.setAttribute('id', `book-${bookObject.id}`);

    return container;
}

function addBook() {
    const title = document.getElementById('judul').value;
    const author = document.getElementById('penulis').value;
    const year = document.getElementById('tahun').value;
    const isComplete = document.getElementById('dibaca').checked;

    const generatedID = generateId();
    const bookObject = generateBookObject(generatedID, title, author, parseInt(year), isComplete);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function moveShelves (bookId) {
    const bookTarget = findBook(bookId);

    bookTarget.isComplete = bookTarget.isComplete === false;

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function deleteBook(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    if (window.confirm("Yakin ingin lanjut menghapus buku?")) {
        books.splice(bookTarget, 1);
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(STORAGE_KEY, parsed);
        document.dispatchEvent(new Event(SAVED_EVENT));
    }
}

const SAVED_EVENT = 'saved-books';
const STORAGE_KEY = 'BOOK_APPS';

function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(RENDER_EVENT, function () {
    const unreadBook = document.getElementById('unread');
    const readedBook = document.getElementById('read')
    unreadBook.innerHTML = '';
    readedBook.innerHTML= '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (bookItem.isComplete) {
            readedBook.append(bookElement);
        } else {
            unreadBook.append(bookElement);
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const submitSearch = document.getElementById('search');
    submitSearch.addEventListener('submit', function (event) {
        event.preventDefault();
        addSearchedBook();
    })
});

function addSearchedBook() {
    const searchInputValue = document.getElementById('searchTitle').value;
    const filteredBook = books.filter((book) => book.title.includes(searchInputValue) || book.author.includes(searchInputValue));
    const searchedBook = document.getElementById('searchedBook')
    searchedBook.innerHTML = '';

    if (filteredBook.length !== 0) {

        const searchedBook = document.getElementById('searchedBook')
        searchedBook.innerHTML = '';
        searchedBook.append(makeBook(...filteredBook));
    } else {
        const searchFailed = document.createElement('h3');
        searchFailed.innerText = "Buku Tidak Ditemukan";
        searchedBook.innerHTML = '';
        searchedBook.append(searchFailed);
    }
}

// const bookTitle = document.createElement('h3');
// bookTitle.innerText = book.title;
//
// const bookAuthor = document.createElement('p');
// bookAuthor.innerText = "Penulis : " + book.author;
//
// const bookYear = document.createElement('p');
// bookYear.innerText = "Terbit : " + book.year;
//
// const container = document.createElement('div');
// container.classList.add('book');
// container.append(bookTitle, bookAuthor, bookYear);
//
// return container;