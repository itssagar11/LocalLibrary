const express= require("express");
const router= express.Router();
const auth= require("./auth");
const book_controller= require("../controllers/bookController");
const author_controller= require("../controllers/authorController");
const bookinstance_controller= require("../controllers/bookinstanceController");
const genre_controller= require("../controllers/genreController");
const passport=require("passport");


router.get('/',book_controller.index);

router.post("/book/create",passport.authenticate('jwt', { session: false }), book_controller.book_create_post);
router.post("/book/:id/delete",passport.authenticate('jwt', { session: false }), book_controller.book_delete_post);
router.post("/book/:id/update",passport.authenticate('jwt', { session: false }), book_controller.book_update_post);
router.get("/book/:id", passport.authenticate('jwt', { session: false }),book_controller.book_detail);
router.get("/books",  passport.authenticate('jwt', { session: false }), book_controller.book_list);


router.post("/author/create",passport.authenticate('jwt', { session: false }), author_controller.author_create_post);
router.post("/author/delete",passport.authenticate('jwt', { session: false }), author_controller.author_delete_post);
router.post("/author/:id/update",passport.authenticate('jwt', { session: false }), author_controller.author_update_post);
router.get("/author/:id",passport.authenticate('jwt', { session: false }), author_controller.author_detail);
router.get("/authors",passport.authenticate('jwt', { session: false }), author_controller.author_list);


router.post("/genre/create",passport.authenticate('jwt', { session: false }), genre_controller.genre_create_post);
router.post("/genre/:id/delete",passport.authenticate('jwt', { session: false }), genre_controller.genre_delete_post);

router.post("/genre/:id/update",passport.authenticate('jwt', { session: false }), genre_controller.genre_update_post);
router.get("/genre/:id",passport.authenticate('jwt', { session: false }), genre_controller.genre_detail);
router.get("/genres",passport.authenticate('jwt', { session: false }), genre_controller.genre_list);


router.post("/bookinstance/create",passport.authenticate('jwt', { session: false }), bookinstance_controller.bookinstance_create_post);
router.post("/bookinstance/:id/delete",passport.authenticate('jwt', { session: false }),bookinstance_controller.bookinstance_delete_post);

router.post("/bookinstance/:id/update",passport.authenticate('jwt', { session: false }),bookinstance_controller.bookinstance_update_post);
router.get("/bookinstance/:id",passport.authenticate('jwt', { session: false }), bookinstance_controller.bookinstance_detail);
router.get("/bookinstances",passport.authenticate('jwt', { session: false }), bookinstance_controller.bookinstance_list);

module.exports= router;