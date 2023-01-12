const express= require("express");
const router= express.Router();

const book_controller= require("../controllers/bookController");
const author_controller= require("../controllers/authorController");
const bookinstance_controller= require("../controllers/bookinstanceController");
const genre_controller= require("../controllers/genreController");


router.get('/',book_controller.index);

router.post("/book/create", book_controller.book_create_post);
router.post("/book/:id/delete", book_controller.book_delete_post);
router.post("/book/:id/update", book_controller.book_update_post);
router.get("/book/:id", book_controller.book_detail);
router.get("/books", book_controller.book_list);


router.post("/author/create", author_controller.author_create_post);
router.post("/author/delete", author_controller.author_delete_post);
router.post("/author/:id/update", author_controller.author_update_post);
router.get("/author/:id", author_controller.author_detail);
router.get("/authors", author_controller.author_list);


router.post("/genre/create", genre_controller.genre_create_post);
router.post("/genre/:id/delete", genre_controller.genre_delete_post);

router.post("/genre/:id/update", genre_controller.genre_update_post);
router.get("/genre/:id", genre_controller.genre_detail);
router.get("/genres", genre_controller.genre_list);


router.post("/bookinstance/create", bookinstance_controller.bookinstance_create_post);
router.post("/bookinstance/:id/delete",bookinstance_controller.bookinstance_delete_post);

router.post("/bookinstance/:id/update",bookinstance_controller.bookinstance_update_post);
router.get("/bookinstance/:id", bookinstance_controller.bookinstance_detail);
router.get("/bookinstances", bookinstance_controller.bookinstance_list);

module.exports= router;