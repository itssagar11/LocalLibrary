const express= require("express");
const router= express.Router();
const auth= require("./auth");
const book_controller= require("../controllers/bookController");
const author_controller= require("../controllers/authorController");
const bookinstance_controller= require("../controllers/bookinstanceController");
const genre_controller= require("../controllers/genreController");



router.get('/',book_controller.index);

router.post("/book/create",auth.VerifyRequest, book_controller.book_create_post);
router.post("/book/:id/delete",auth.VerifyRequest, book_controller.book_delete_post);
router.post("/book/:id/update",auth.VerifyRequest, book_controller.book_update_post);
router.get("/book/:id", auth.VerifyRequest,book_controller.book_detail);
router.get("/books",auth.VerifyRequest, book_controller.book_list);


router.post("/author/create",auth.VerifyRequest, author_controller.author_create_post);
router.post("/author/delete",auth.VerifyRequest, author_controller.author_delete_post);
router.post("/author/:id/update",auth.VerifyRequest, author_controller.author_update_post);
router.get("/author/:id",auth.VerifyRequest, author_controller.author_detail);
router.get("/authors",auth.VerifyRequest, author_controller.author_list);


router.post("/genre/create",auth.VerifyRequest, genre_controller.genre_create_post);
router.post("/genre/:id/delete",auth.VerifyRequest, genre_controller.genre_delete_post);

router.post("/genre/:id/update",auth.VerifyRequest, genre_controller.genre_update_post);
router.get("/genre/:id",auth.VerifyRequest, genre_controller.genre_detail);
router.get("/genres",auth.VerifyRequest, genre_controller.genre_list);


router.post("/bookinstance/create",auth.VerifyRequest, bookinstance_controller.bookinstance_create_post);
router.post("/bookinstance/:id/delete",auth.VerifyRequest,bookinstance_controller.bookinstance_delete_post);

router.post("/bookinstance/:id/update",auth.VerifyRequest,bookinstance_controller.bookinstance_update_post);
router.get("/bookinstance/:id",auth.VerifyRequest, bookinstance_controller.bookinstance_detail);
router.get("/bookinstances",auth.VerifyRequest, bookinstance_controller.bookinstance_list);

module.exports= router;