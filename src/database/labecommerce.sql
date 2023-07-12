-- Active: 1689200705156@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt TEXT DEFAULT (DATETIME()) NOT NULL
    );

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE
    products(
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    );

SELECT * FROM products;

DROP TABLE products;

DELETE FROM users WHERE id = 'u003';

DELETE FROM products WHERE id = 'prod002';

UPDATE products
SET
    name = 'Fone gamer',
    price = 180.00,
    description = 'O melhor fone gamer',
    imageUrl = 'http://www.minhaloja.com/fone-gamer'
WHERE id = 'prod003';

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        createdAt TEXT DEFAULT (DATETIME()) NOT NULL,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );

SELECT * FROM purchases;

DROP TABLE purchases;

UPDATE purchases SET total_price = 75 WHERE id = 'p001';

SELECT
    users.id AS userId,
    purchases.id AS orderId,
    users.name,
    users.email,
    purchases.total_price,
    purchases.createdAt
FROM purchases
    JOIN users ON purchases.buyer = users.id;

CREATE TABLE
    purchases_products(
        purchase_id TEXT NOT NULL,
        product_id TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (purchase_id) REFERENCES purchases(id),
        FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT
    );

INSERT INTO
    purchases_products (
        purchase_id,
        product_id,
        quantity
    )
VALUES ('pur001', 'prod001', 4), ('pur001', 'prod002', 2);

SELECT * FROM purchases_products;

DROP TABLE purchases_products;

SELECT *
FROM products
    LEFT JOIN purchases_products ON products.id = purchases_products.product_id
    LEFT JOIN purchases ON purchases.id = purchases_products.purchase_id;

UPDATE users SET name = '02' WHERE id = 'Rafael';


INSERT INTO users (id, name, email, password)
VALUES
  ('c001', 'Fulana', 'fulana@email.com', '123456'),
  ('c002', 'Fulano', 'fulano@email.com', '123456'),
  ('c003', 'Sicrana', 'sicrana@email.com', '123456'),
  ('c004', 'Fayra', 'fayra@email.com', '123456');

  INSERT INTO products (id, name, price, description, imageUrl)
VALUES
  ('p001', 'mouse', 100, 'esrdxfcghvbj', 'image'),
  ('p002', 'teclado', 300, 'dsfcgjkn', 'image'),
  ('p003', 'PC', 400, 'fdcghvbjn', 'image'),
  ('p004', 'mouse gamer', 700, 'esrdxfcghvbj', 'image'),
  ('p005', 'teclado gamer', 900, 'dsfcgjkn', 'image'),
  ('p006', 'PC gamer', 1000, 'fdcghvbjn', 'image')
;

INSERT INTO purchases(id, buyer,total_price)
VALUES ('P001','c001',300),
       ('P002','c003',400),
       ('P003','c002',500);

INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES ('P001','p001',2),
       ('P002','p002',3),
       ('P003','p003',4)
;