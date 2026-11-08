const myLibrary = [];

function Book(title, author, pages, read) {
    //the constructor
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    //take params, create a book then store it in the array
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

addBookToLibrary("JavaScript 基础教程", "张三", 350, true);
addBookToLibrary("CSS深度解析", "李四", 280, false);

const libraryContainer = document.getElementById("library-container");
const newBookBtn = document.getElementById("new-book-btn");
const bookDialog = document.getElementById("book-dialog");
const bookForm = document.getElementById("book-form");
const cancelBtn = document.getElementById("cancel-btn");

newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
    //showModal 是什么？？
});

cancelBtn.addEventListener("click", () => {
    bookDialog.close();
    bookForm.reset();
});

function displayBooks() {
    libraryContainer.innerHTML = "";
    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        card.dataset.id = book.id;
        //这是什么意思？？
        card.innerHTML = `
            <h3>${escapeHtml(book.title)}</h3>
            <p>作者: ${escapeHtml(book.author)}</p>
            <p>页数: ${book.pages}</p>
            <p>状态: <span class="read-status">${book.read ? "已读 📖" : "未读 ⏳"}</span></p>
            <div class="card-actions">
                <button class="toggle-read-btn">切换状态</button>
                <button class="delete-btn">删除</button>
            </div>
        `;

        libraryContainer.appendChild(card);
    });
}

function escapeHtml(text) {
  // 必须加上这行防空校验，否则 text 如果为空就会导致渲染失败
  if (!text || typeof text !== 'string') return ''; 

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = Number(document.getElementById("pages").value);
    const read = document.getElementById("read").checked;
    
    addBookToLibrary(title, author, pages, read);

    displayBooks();

    bookDialog.close();
    bookForm.reset();
});

libraryContainer.addEventListener("click", (e) => {
    const card = e.target.closest(".book-card");
    if(!card) return;

    const bookId = card.dataset.id;
    const bookIndex = myLibrary.findIndex((book) => book.id ===bookId);
    if (bookIndex === -1) return;

    if (e.target.classList.contains("delete-btn")) {
        myLibrary.splice(bookIndex, 1);
        displayBooks();
    }

    if(e.target.classList.contains("toggle-read-btn")) {
        myLibrary[bookIndex].toggleReadStatus();
        displayBooks();
    }
 });

 displayBooks();