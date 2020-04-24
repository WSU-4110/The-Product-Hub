review	CREATE TABLE `review` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `remark` varchar(100) NOT NULL,
  `category` varchar(45) NOT NULL,
  `image` longblob DEFAULT NULL,
  `sponsored` varchar(4) DEFAULT NULL,
  `rating` varchar(45) DEFAULT NULL,
  `pid` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100199 DEFAULT CHARSET=utf8mb4	




review	CREATE TABLE `review` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  `remark` varchar(100) NOT NULL,
  `category` varchar(45) NOT NULL,
  `rating` varchar(45) DEFAULT NULL,
  `pid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100199 DEFAULT CHARSET=utf8mb4	
