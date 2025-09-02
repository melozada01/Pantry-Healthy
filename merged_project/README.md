# Pantry Healthy - PHP MVC (demo)

Este projeto é um scaffold minimalista de arquitetura MVC em PHP com o padrão Repository implementado como camada de persistência (PDO).

## Estrutura importante
- `app/Models` - modelos simples (User, FoodItem, PantryItem, Goal e Database PDO connector)
- `app/Repositories` - repository interface e implementações PDO para cada model
- `app/Controllers` - controllers básicos (Home, Food, User)
- `app/Views` - views simples em PHP
- `public` - front controller (index.php) e .htaccess
- `config/database.php` - configuração (por padrão usa SQLite em storage/database.sqlite)
- `migrations/create_tables.sql` - script SQL de criação das tabelas (SQLite)

## Rodando localmente
1. Instale dependências (opcional): `composer install`
2. Garanta que `storage/` é gravável. Caso esteja usando SQLite, o arquivo será criado automaticamente.
3. Execute as migrations: `sqlite3 storage/database.sqlite < migrations/create_tables.sql`
4. Rode com PHP embutido: `php -S localhost:8000 -t public`

## Notas
- Este scaffold é intencionalmente simples para facilitar integração ao seu projeto existente.
- Sinta-se livre para pedir que eu adapte nomes, campos, ou adicione controllers e testes.
