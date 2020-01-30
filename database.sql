#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

DROP DATABASE wild_circus;

CREATE DATABASE wild_circus;

USE wild_circus;

#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        id       Int  Auto_increment  NOT NULL ,
        nickname Varchar (120) NOT NULL ,
        email    Varchar (120) NOT NULL ,
        password Varchar (120) NOT NULL ,
        money    Int NOT NULL
	,CONSTRAINT user_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: event
#------------------------------------------------------------

CREATE TABLE event(
        id        Int  Auto_increment  NOT NULL ,
        name      Varchar (120) NOT NULL ,
        price     Int NOT NULL ,
	date     Date NOT NULL ,
        capacity Int NOT NULL
	,CONSTRAINT event_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: ticket
#------------------------------------------------------------

CREATE TABLE ticket(
	id 		Int Auto_increment NOT NULL,
        event_id       Int NOT NULL ,
        user_id  Int NOT NULL ,
        quantity Int NOT NULL
	,CONSTRAINT ticket_PK PRIMARY KEY (id)

	,CONSTRAINT ticket_event_FK FOREIGN KEY (event_id) REFERENCES event(id)
	,CONSTRAINT ticket_user0_FK FOREIGN KEY (user_id) REFERENCES user(id)
)ENGINE=InnoDB;


