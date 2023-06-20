-- Active: 1687300051540@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT NOT NULL
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