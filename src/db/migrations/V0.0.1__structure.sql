USE racional_db;

-- Tabla User
CREATE TABLE User (
    id CHAR(36) PRIMARY KEY NOT NULL,
    rut VARCHAR(9) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    passwordHash VARCHAR(255) NOT NULL,
    enabled BOOLEAN DEFAULT TRUE
);

-- Tabla Transaction
CREATE TABLE Transaction (
    id CHAR(36) PRIMARY KEY NOT NULL,
    amount FLOAT NOT NULL,
    type ENUM('deposit', 'withdrawal') NOT NULL,
    date DATETIME NOT NULL,
    userId CHAR(36) NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Tabla Stock
CREATE TABLE Stock (
    id CHAR(36) PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    ticker VARCHAR(10)
);

-- Tabla Order
CREATE TABLE `Order` (
    id CHAR(36) PRIMARY KEY NOT NULL,
    amount FLOAT NOT NULL,
    type ENUM('buy', 'sell') NOT NULL,
    date DATETIME NOT NULL,
    price FLOAT NOT NULL,
    stockId CHAR(36) NOT NULL,
    userId CHAR(36) NOT NULL,
    FOREIGN KEY (stockId) REFERENCES Stock(id),
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Tabla Portfolio
CREATE TABLE Portfolio (
    id CHAR(36) PRIMARY KEY NOT NULL,
    userId CHAR(36) NOT NULL UNIQUE,
    riskLevel INT NOT NULL CHECK (riskLevel BETWEEN 1 AND 10),
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Tabla PortfolioStock
CREATE TABLE PortfolioStock (
    id CHAR(36) PRIMARY KEY NOT NULL,
    amount FLOAT NOT NULL,
    stockId CHAR(36) NOT NULL,
    portfolioId CHAR(36) NOT NULL,
    avgPurchasePrice FLOAT,
    FOREIGN KEY (stockId) REFERENCES Stock(id),
    FOREIGN KEY (portfolioId) REFERENCES Portfolio(id)
);