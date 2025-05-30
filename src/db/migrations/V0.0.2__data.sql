-- Insertar datos de ejemplo

-- Usuarios
INSERT INTO User (id, rut, name, username, email, passwordHash, enabled) VALUES
(UUID(), '12345678K', 'Carlos Rivas', 'crivas', 'crivas@example.com', MD5('password1'), TRUE),
(UUID(), '23456789K', 'María Torres', 'mtorres', 'mtorres@example.com', MD5('password2'), TRUE),
(UUID(), '34567890K', 'Juan Pérez', 'jperez', 'jperez@example.com', MD5('password3'), TRUE),
(UUID(), '45678901K', 'Lucía Gómez', 'lgomez', 'lgomez@example.com', MD5('password4'), TRUE),
(UUID(), '56789012K', 'Andrés Soto', 'asoto', 'asoto@example.com', MD5('password5'), TRUE);

-- Stocks
INSERT INTO Stock (id, name, ticker) VALUES
(UUID(), 'Apple Inc.', 'AAPL'),
(UUID(), 'Amazon.com Inc.', 'AMZN'),
(UUID(), 'Tesla Inc.', 'TSLA'),
(UUID(), 'Microsoft Corp.', 'MSFT'),
(UUID(), 'Nvidia Corp.', 'NVDA');

-- Portafolios (uno por usuario)
INSERT INTO Portfolio (id, userId, riskLevel, name, balance)
SELECT UUID(), id, FLOOR(1 + RAND() * 10), CONCAT(name, "'s Portfolio"), FLOOR(1000 + RAND() * 10000)
FROM User;

-- Transacciones aleatorias para los usuarios
INSERT INTO Transaction (id, amount, type, date, userId) VALUES
(UUID(), 1000, 'deposit', '2024-01-15 15:00:00', (SELECT id FROM User LIMIT 1 OFFSET 0)),
(UUID(), 200, 'withdrawal', '2024-02-10 16:30:00', (SELECT id FROM User LIMIT 1 OFFSET 1)),
(UUID(), 500, 'deposit', '2024-03-05 17:30:00', (SELECT id FROM User LIMIT 1 OFFSET 2)),
(UUID(), 1200, 'deposit', '2024-03-12 18:00:00', (SELECT id FROM User LIMIT 1 OFFSET 3)),
(UUID(), 300, 'withdrawal', '2024-03-20 19:00:00', (SELECT id FROM User LIMIT 1 OFFSET 4)),
(UUID(), 150, 'deposit', '2024-04-01 10:30:00', (SELECT id FROM User LIMIT 1 OFFSET 0)),
(UUID(), 450, 'withdrawal', '2024-04-12 11:30:00', (SELECT id FROM User LIMIT 1 OFFSET 1)),
(UUID(), 980, 'deposit', '2024-04-22 12:30:00', (SELECT id FROM User LIMIT 1 OFFSET 2)),
(UUID(), 600, 'deposit', '2024-05-01 13:30:00', (SELECT id FROM User LIMIT 1 OFFSET 3)),
(UUID(), 300, 'withdrawal', '2024-05-10 14:00:00', (SELECT id FROM User LIMIT 1 OFFSET 4)),
(UUID(), 700, 'deposit', '2024-05-15 15:30:00', (SELECT id FROM User LIMIT 1 OFFSET 0)),
(UUID(), 200, 'withdrawal', '2024-05-20 16:00:00', (SELECT id FROM User LIMIT 1 OFFSET 1)),
(UUID(), 1100, 'deposit', '2024-05-21 17:00:00', (SELECT id FROM User LIMIT 1 OFFSET 2)),
(UUID(), 250, 'withdrawal', '2024-05-22 18:00:00', (SELECT id FROM User LIMIT 1 OFFSET 3)),
(UUID(), 800, 'deposit', '2024-05-25 19:30:00', (SELECT id FROM User LIMIT 1 OFFSET 4));

-- Órdenes con precios variados
INSERT INTO `Order` (id, amount, type, date, price, stockId, userId)
SELECT UUID(), 
       ROUND(1 + RAND() * 20, 2), 
       IF(RAND() > 0.5, 'buy', 'sell'), 
       DATE_ADD('2024-01-01 14:30:00', INTERVAL FLOOR(RAND() * 150) DAY),
       ROUND(100 + RAND() * 900, 2),
       s.id,
       u.id
FROM User u
JOIN Stock s
ORDER BY RAND()
LIMIT 15;

-- PortfolioStock
INSERT INTO PortfolioStock (id, amount, stockId, portfolioId, avgPurchasePrice)
SELECT UUID(),
       ROUND(1 + RAND() * 50, 2),
       s.id,
       p.id,
       ROUND(50 + RAND() * 500, 2)
FROM Stock s
JOIN Portfolio p
ORDER BY RAND()
LIMIT 15;