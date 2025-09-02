-- Criação do banco de dados
CREATE DATABASE pantry_healthy;
USE pantry_healthy;

-- Criação de todas as tabelas do app Pantry Healthy
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255),
    genero ENUM('Masculino', 'Feminino', 'Outro'),
    peso DECIMAL(5,2),
    altura DECIMAL(4,2),
    data_nascimento DATE,
    objetivo VARCHAR(100),
    atividade_fisica BOOLEAN,
    restricao_alimentar TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE metas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    titulo VARCHAR(100),
    descricao TEXT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE alimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    calorias INT,
    proteinas DECIMAL(5,2),
    carboidratos DECIMAL(5,2),
    gorduras DECIMAL(5,2),
    imagem_url VARCHAR(255)
);

CREATE TABLE alimentos_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    alimento_id INT,
    quantidade INT,
    data_adicao DATE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (alimento_id) REFERENCES alimentos(id)
);

CREATE TABLE refeicoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    nome VARCHAR(100),
    data_refeicao DATE,
    horario TIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE refeicao_alimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    refeicao_id INT,
    alimento_id INT,
    quantidade INT,
    FOREIGN KEY (refeicao_id) REFERENCES refeicoes(id),
    FOREIGN KEY (alimento_id) REFERENCES alimentos(id)
);

CREATE TABLE chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    de_usuario_id INT,
    para_usuario_id INT,
    mensagem TEXT,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (de_usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (para_usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    notificacoes BOOLEAN DEFAULT TRUE,
    modo_escuro BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
