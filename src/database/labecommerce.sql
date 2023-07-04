-- Active: 1687300051540@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );


CREATE TABLE
    products(
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod001',
        'Mouse gamer',
        250.00,
        'O melhor mouse',
        'http://www.minhaloja.com/mouse-gamer'
    ), (
        'prod002',
        'Teclado gamer',
        275.00,
        'O melhor teclado',
        'http://www.minhaloja.com/teclado-gamer'
    ), (
        'prod003',
        'Fone ouvido gamer',
        150.00,
        'O melhor fone ',
        'http://www.minhaloja.com/fone-ouvido-gamer'
    ), (
        'prod004',
        'Monitor gamer',
        1000.00,
        'O melhor monitor',
        'http://www.minhaloja.com/monitor-gamer'
    ), (
        'prod005',
        'Cadeira gamer',
        1150.00,
        'A melhor cadeira',
        'http://www.minhaloja.com/cadeira-gamer'
    );

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u001',
        'Fulano',
        'fulano@gmail.com',
        'pass1234',
        'hoje-a-noite-agorinha'
    ), (
        'u002',
        'Beltrano',
        'beltrano@gmail.com',
        'pass4321',
        'hoje-a-noite-jaja'
    ), (
        'u003',
        'Ciclano',
        'ciclano@gmail.com',
        'pass1243',
        'hoje-a-noite-agora'
    );

SELECT * FROM users;

SELECT * FROM products;

SELECT * FROM products WHERE name LIKE '%ga%';

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        created_at
    )
VALUES (
        'u004',
        'Outrano',
        'outrano@gmail.com',
        'pass3412',
        'outro-dia-agora'
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        image_url
    )
VALUES (
        'prod006',
        'webcam',
        155.50,
        'A melhor camera',
        'http://www.minhaloja.com/webcam'
    );

DELETE FROM users WHERE id = 'u003';

DELETE FROM products WHERE id = 'prod002';

UPDATE products
SET
    name = 'Fone gamer',
    price = 180.00,
    description = 'O melhor fone gamer',
    image_url = 'http://www.minhaloja.com/fone-gamer'
WHERE id = 'prod003';

CREATE TABLE
    purchases (
        id TEXT PRIMARY KEY NOT NULL,
        buyer TEXT NOT NULL,
        total_price REAL NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (buyer) REFERENCES users(id)
    );


SELECT * FROM purchases;

INSERT INTO
    purchases (id, buyer, total_price)
VALUES ('p001', 'u002', 50), ('p002', 'u001', 60), ('p003', 'u004', 40);

UPDATE purchases SET total_price = 75 WHERE id = 'p001';

SELECT
    users.id AS userId,
    purchases.id AS orderId,
    users.name,
    users.email,
    purchases.total_price,
    purchases.created_at
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
    purchases_products(
        purchase_id,
        product_id,
        quantity
    )
VALUES
('p001', 'prod005', 2), ('p002', 'prod003', 5), ('p003', 'prod006', 1);


SELECT * FROM products
LEFT JOIN purchases_products ON products.id = purchases_products.product_id
LEFT JOIN purchases ON purchases.id = purchases_products.purchase_id;


UPDATE users
SET name = '02'
WHERE id = 'Julia';