
  
CREATE TABLE `product` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NULL,
  `question` VARCHAR(500) NOT NULL,
  `category` VARCHAR(20) NOT NULL,
  `image` LONGBLOB NULL,
  `rate` INT NULL,
  PRIMARY KEY (`id`));


INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(1,
"Speakers",
"JBL",
"Is there a woofer?",
"electronics",
"https://images-na.ssl-images-amazon.com/images/I/91HnLmz7bsL._AC_SL1500_.jpg",
"3");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(2,
"Headphones",
"Sony",
"Is it noise cancellation?",
"electronics",
"https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6280/6280544_rd.jpg",
"3");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(3,
"Laptop",
"Mac",
"Is it good for csc major?",
"electronics",
"https://www.adorama.com/images/Large/acmvvl2lla.jpg",
"0");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(6,
"Frozen Mac&Cheese",
"Lean Cuisine",
"How much time to cook it?",
"food",
"https://mrsmedia.nestleusa.com/Images/Products/78_Nimg.png",
"5");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(4,
"Frozen Mac&Cheese",
"Lean Cuisine",
"How much time to cook it?",
"food",
"https://mrsmedia.nestleusa.com/Images/Products/78_Nimg.png",
"5");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(7,
"Dior Perfume",
"Dior",
"How strong is the smell?",
"beauty",
"https://www.dior.com/beauty/version-5.1563986503612/resize-image/ep/3000/2000/90/0/%252FY0082217%252FV002%252FY0082217_F008221709_E01_ZHC.jpg",
"5");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(8,
"face mask",
"Sephora",
"IS it worth the price?",
"beauty",
"https://www.sephora.com/productimages/sku/s1764976-main-zoom.jpg",
"5");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(9,
"Slides",
"Adidas",
"IS it worth the price?",
"other",
"https://assets.adidas.com/images/w_600,f_auto,q_auto:sensitive,fl_lossy/9e4850c6019841138e38a7fa00de8937_9366/Adilette_Slides_Black_280647_01_standard.jpg",
"5");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(10,
"Jif Cleaner",
"Jif",
"IS it worth the price?",
"Home",
"https://i.ebayimg.com/00/s/ODAwWDgwMA==/z/AwwAAOSwnnlbm29y/$_57.JPG",
"5");


INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(11,
"Cleaner",
"Clorox",
"IS it strong?",
"Home",
"https://images-na.ssl-images-amazon.com/images/I/713QS8i1vTL._SY679_.jpg",
"2");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(12,
"IMAX theatre",
"IMAX",
"IS it surround sound?",
"Entertainment",
"https://cdn.celluloidjunkie.com/wp-content/uploads/2019/10/22013848/imax-general-image.jpg",
"2");

INSERT INTO `product`
(`id`,
`name`,
`brand`,
`question`,
`category`,
`image`,
`rate`)
VALUES
(13,
"IT Movie",
"No Brand",
"IS it actually scary?",
"Entertainment",
"https://m.media-amazon.com/images/M/MV5BYjg1YTRkNzQtODgyYi00MTQ5LThiMDYtNDJjMWRjNTdjZDZlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
"0");


select * from product;
