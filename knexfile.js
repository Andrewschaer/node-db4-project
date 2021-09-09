module.exports = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './data/recipes.db3'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './data/migrations'
        },
        seeds: {
            directory: './data/seeds'
        }
    },
    production: {
        // N/A For This Project
    },
    testing: {
        // N/A For This Project
    }
}