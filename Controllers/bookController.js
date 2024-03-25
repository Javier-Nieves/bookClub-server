const Book = require("../models/bookModel");

const testBook = {
  bookid: "tSbWMu_-D5AC",
  title: "Things Fall Apart",
  author: "Chinua Achebe",
  country: "Nigeria",
  pages: 176,
  desc: "<p><b>One of the BBC's '100 Novels That Shaped Our World'</b><br><b><br>A worldwide bestseller and the first part of Achebe's African Trilogy, <i>Things Fall Apart </i>is the compelling story of one man's battle to protect his community against the forces of change</b><br><br>Okonkwo is the greatest wrestler and warrior alive, and his fame spreads throughout West Africa like a bush-fire in the harmattan. But when he accidentally kills a clansman, things begin to fall apart. Then Okonkwo returns from exile to find missionaries and colonial governors have arrived in the village. With his world thrown radically off-balance he can only hurtle towards tragedy. <br><br>First published in 1958, Chinua Achebe's stark, coolly ironic novel reshaped both African and world literature, and has sold over ten million copies in forty-five languages. This arresting parable of a proud but powerless man witnessing the ruin of his people begins Achebe's landmark trilogy of works chronicling the fate of one African community, continued in <i>Arrow of God</i> and <i>No Longer at Ease</i>.<br><br>'His courage and generosity are made manifest in the work' Toni Morrison<br><br>'The writer in whose company the prison walls fell down' Nelson Mandela<br><br>'A great book, that bespeaks a great, brave, kind, human spirit' John Updike<br><br>With an Introduction by Biyi Bandele</p>",
  image_link:
    "http://books.google.com/books/content?id=tSbWMu_-D5AC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE72AEohx3ewNmu6dj0SjwBYtY6F-zpGjv4FZ23XRK5jrGRFyhfGwoj5KNhPFN3IkORZyEN4P6irUddN88rZgXfpBk7oLLjy7JzfuoODOkbfxgSGUHeYNfSDfnw_GUFxFi4VTZU1B&source=gbs_api",
  year: 1958,
  read: true,
  upcoming: false,
  rating: 6.3,
  meeting_date: "2023-10-14",
};

exports.getAll = async function (req, res) {
  const books = await Book.find();
  res.status(200).json({ status: "success", data: { books } });
};

exports.createBook = async function (req, res) {
  const newBook = await Book.create(testBook);
  res.status(200).json({ status: "success", data: { newBook } });
};
