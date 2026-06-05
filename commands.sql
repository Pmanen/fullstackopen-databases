CREATE TABLE blogs ( id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes INTEGER DEFAULT 0 );

insert into blogs (title, author, url, likes) values ('Meet the sad wives of AI', 'Alessandra Ram', 'https://www.wired.com/story/meet-the-sad-wives-of-ai', 1);
insert into blogs (title, author, url) values ('The strange, soothing world of Instagram''s computer-generated interiors', 'Anna Wiener', 'https://www.newyorker.com/culture/rabbit-holes/the-strange-soothing-world-of-instagrams-computer-generated-interiors');