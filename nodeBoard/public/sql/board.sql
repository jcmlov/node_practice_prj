CREATE TABLE `board` (
	`idx` INT(11) NOT NULL AUTO_INCREMENT,
	`creator_id` VARCHAR(50) NOT NULL,
	`title` VARCHAR(50) NOT NULL,
	`content` MEDIUMTEXT NOT NULL,
	`regdate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`modidate` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`passwd` VARCHAR(50) NOT NULL,
	`hit` INT(11) NOT NULL DEFAULT '0',
	PRIMARY KEY (`idx`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=3
;

INSERT INTO `board` (`idx`, `creator_id`, `title`, `content`, `regdate`, `modidate`, `passwd`, `hit`) VALUES
	(1, 'whiteday910', '제목입니다.', '내용입니다.', '2015-04-12 00:03:30', '2015-04-12 00:03:32', '1234', 0),
	(2, 'devlecture', '두번째 글 제목입니다.', '내용이죠~', '2015-04-12 01:35:59', '2015-04-12 01:36:00', '1234', 0);