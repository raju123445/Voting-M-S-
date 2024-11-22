create database voting1;

use voting1;

CREATE TABLE Users (
    voter_id INT PRIMARY KEY AUTO_INCREMENT,
    votername VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    registration_date DATE,
    voted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Admin (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Candidates (
    candidate_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    party VARCHAR(100),
    position VARCHAR(100),
    bio TEXT
);

CREATE TABLE Votes (
    vote_id INT PRIMARY KEY AUTO_INCREMENT,
    voter_id INT,
    candidate_id INT,
    voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (voter_id) REFERENCES Users(voter_id),
    FOREIGN KEY (candidate_id) REFERENCES Candidates(candidate_id)
);

insert into admin (admin_id, username, password,email,created_at)
values (1,'admin','password','admin@gmail.com',curdate());

insert into Users(voter_id,votername,password,email,registration_date,voted)
values(
    1,'Ram','password','ram@gmail.com',curdate(),false
);

select * from users