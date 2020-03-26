use bandhan_producthub;

CREATE TABLE `bandhan_producthub`.`product` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `brand` VARCHAR(45) NOT NULL,
  `question` VARCHAR(100) NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `image` LONGBLOB NULL,
  `rate` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);
  
insert into product values (1, 'Maggi', 'Knorr', 'Is this tasty?', 'food' , 'https://www.shutterstock.com/image-photo/maggie-spicy-noodles-instant-696121966.jpg ', '4/5');
insert into product values (2, 'Dior Perfume', 'Dior', 'how is the smell?', 'fashion' , '.jpg ', '3/5');
insert into product values (3, 'iPhone', 'Apple', 'How are the selfies??', 'electronics' , '.jpg ', '1/5');
insert into product values (4, 'Speaker', 'JBL', 'Is this loud?', 'entertainment' , '.jpg ', '4/5');
insert into product values (5, 'Bathroom Shower Cleaner', 'Meijer', 'Is this strong?', 'home' , '.jpg ', '4/5');
insert into product values (6, 'Face Mask', 'Glam Glow', 'Is this worth the price?', 'other' , '.jpg ', '5/5');
  
