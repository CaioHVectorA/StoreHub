INSERT INTO users (id, username, email, CPF, CEP, password, picture)
OUTPUT Inserted.id
VALUES ('user_id', 'username', 'email@example.com', '12345678901', '12345678', 'password', 'picture_url');
