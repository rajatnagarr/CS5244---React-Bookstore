DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

-- Inserting categories
INSERT INTO `category` (`name`) VALUES
                                    ('Fiction'),
                                    ('Fantasy'),
                                    ('Mystery'),
                                    ('Romance'),
                                    ('Horror'),
                                    ('Classics');

-- Fiction (1001)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES
                                                                                                        ('To Kill a Mockingbird', 'Harper Lee', 'A novel about the experiences of racism and ethical injustice in the American South.', 8.99, 4.8, TRUE, FALSE, 1001),
                                                                                                        ('1984', 'George Orwell', 'A dystopian novel presenting an imagined future under totalitarian rule.', 9.99, 4.7, FALSE, FALSE, 1001),
                                                                                                        ('The Catcher in the Rye', 'J.D. Salinger', 'A story about the complexities of adolescence.', 10.99, 4.5, TRUE, FALSE, 1001),
                                                                                                        ('The Great Gatsby', 'F. Scott Fitzgerald', 'A tale of greed, betrayal, and the quest for the American Dream in the Roaring Twenties.', 7.99, 4.6, FALSE, FALSE, 1001);

-- Fantasy (1002)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES
                                                                                                        ('The Hobbit', 'J.R.R. Tolkien', 'The adventure of Bilbo Baggins and his quest across Middle-earth.', 10.99, 4.8, TRUE, FALSE, 1002),
                                                                                                        ('Harry Potter and the Sorcerer’s Stone', 'J.K. Rowling', 'The first book in the Harry Potter series, introducing Harry and his journey into the world of magic.', 8.99, 4.9, FALSE, FALSE, 1002),
                                                                                                        ('The Name of the Wind', 'Patrick Rothfuss', 'The tale of the magically gifted young man growing to be the most notorious wizard his world has ever seen.', 9.99, 4.7, TRUE, FALSE, 1002),
                                                                                                        ('Mistborn The Final Empire', 'Brandon Sanderson', 'A struggle for freedom in a world ruled by a dark lord known as the Lord Ruler.', 7.99, 4.8, FALSE, FALSE, 1002);

-- Mystery (1003)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES
                                                                                                        ('The Da Vinci Code', 'Dan Brown', 'A mystery thriller that follows a symbologist and a cryptologist who discover a religious conspiracy.', 8.99, 4.5, TRUE, FALSE, 1003),
                                                                                                        ('The Girl with the Dragon Tattoo', 'Stieg Larsson', 'A tale intertwining murder mystery, family saga, and financial intrigue.', 9.99, 4.6, FALSE, FALSE, 1003),
                                                                                                        ('And Then There Were None', 'Agatha Christie', 'A mystery novel where ten people are invited to an island by a mysterious host, and then they start to be killed one by one.', 7.99, 4.7, TRUE, FALSE, 1003),
                                                                                                        ('Gone Girl', 'Gillian Flynn', 'A thriller unveiling the mysteries of a modern marriage.', 10.99, 4.8, FALSE, FALSE, 1003);

-- Romance (1004)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES
                                                                                                        ('Pride and Prejudice', 'Jane Austen', 'A romantic novel of manners that explores the issues of marriage, morality, and misconceptions.', 6.99, 4.9, TRUE, FALSE, 1004),
                                                                                                        ('Outlander', 'Diana Gabaldon', 'A time travel romance set in Scotland.', 9.99, 4.8, FALSE, FALSE, 1004),
                                                                                                        ('The Time Traveler’s Wife', 'Audrey Niffenegger', 'A love story about a man with a genetic disorder that causes him to time travel unpredictably.', 8.99, 4.7, TRUE, FALSE, 1004),
                                                                                                        ('Me Before You', 'Jojo Moyes', 'A story about love and how it can transform our lives in ways we never expect.', 7.99, 4.6, FALSE, FALSE, 1004);

-- Horror (1005)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES
                                                                                                        ('Dracula', 'Bram Stoker', 'The classic tale of Count Dracula’s attempt to move from Transylvania to England.', 5.99, 4.7, TRUE, FALSE, 1005),
                                                                                                        ('IT', 'Stephen King', 'A horror novel about seven children being terrorized by a malevolent entity.', 10.99, 4.8, FALSE, FALSE, 1005),
                                                                                                        ('The Haunting of Hill House', 'Shirley Jackson', 'A supernatural horror novel about four seekers who arrive at a notoriously unfriendly pile called Hill House.', 6.99, 4.7, TRUE, FALSE, 1005),
                                                                                                        ('Pet Sematary', 'Stephen King', 'A novel about a family that discovers a mysterious burial ground behind their home with the power to raise the dead.', 9.99, 4.6, FALSE, FALSE, 1005);

-- Classics (1006)
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES
                                                                                                        ('The Great Gatsby', 'F. Scott Fitzgerald', 'A tale of greed, betrayal, and the quest for the American Dream in the Roaring Twenties.', 7.99, 4.6, TRUE, FALSE, 1006),
                                                                                                        ('Moby Dick', 'Herman Melville', 'An epic tale of the sea and a hunt for the elusive whale, Moby Dick.', 8.99, 4.5, FALSE, FALSE, 1006),
                                                                                                        ('War and Peace', 'Leo Tolstoy', 'A narrative that follows the French invasion of Russia and the impact of the Napoleonic era on Tsarist society.', 9.99, 4.7, TRUE, FALSE, 1006),
                                                                                                        ('Crime and Punishment', 'Fyodor Dostoevsky', 'A novel focusing on the mental anguish and moral dilemmas of a poor ex-student in Saint Petersburg who formulates a plan to kill an unscrupulous pawnbroker.', 6.99, 4.8, FALSE, FALSE, 1006);
