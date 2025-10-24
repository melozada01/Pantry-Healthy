-- Criação mínima para demo. Ajuste conforme seu arquivo completo 'Pantry Healthy.sql'.
CREATE DATABASE IF NOT EXISTS pantry_healthy CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pantry_healthy;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  genero VARCHAR(50),
  peso DECIMAL(6,2),
  altura DECIMAL(5,2),
  data_nascimento DATE,
  objetivo VARCHAR(255),
  atividade_fisica VARCHAR(255),
  restricao_alimentar TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- tabela alimentos (exemplo mínimo)
CREATE TABLE IF NOT EXISTS alimentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(191) NOT NULL,
  calorias INT DEFAULT 0,
  proteinas DECIMAL(6,2) DEFAULT 0,
  carboidratos DECIMAL(6,2) DEFAULT 0,
  gorduras DECIMAL(6,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- alimentos_usuario exemplo
CREATE TABLE IF NOT EXISTS alimentos_usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  alimento_id INT NOT NULL,
  quantidade DECIMAL(8,2) DEFAULT 1,
  data_adicao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  FOREIGN KEY (alimento_id) REFERENCES alimentos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
