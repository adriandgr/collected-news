# collected-news


```bash
$ nvm use
$ yarn || npm i

# If you haven't created the postgres db run (or create in psql REPL):
$ createdb collected_news_dev

# Copy .env template and enter your environment variables:
$ cp .env.example .env

# Migrate and seed the database:
$ sequelize db:migrate
$ sequelize db:seed:all

$ yarn run start:dev || npm run start:dev
```