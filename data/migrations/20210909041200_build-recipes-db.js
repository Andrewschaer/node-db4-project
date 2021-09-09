
exports.up = async function(knex) {
    await knex.schema
        .createTable('recipes', table => {
            table.increments('recipe_id');
            table.text('recipe_name').unique().notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
        .createTable('steps', table => {
            table.increments('step_id');
            table.integer('step_number').notNullable();
            table.text('step_instructions').notNullable();
            table.integer('recipe_id')
                .unsigned()
                .notNullable()
                .references('recipe_id')
                .inTable('recipes')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        })
        .createTable('ingredients', table => {
            table.increments('ingredient_id');
            table.text('ingredient_name').notNullable();
        })
        .createTable('ingredient_quantities', table => {
            table.increments('quantity_id');
            table.float('quantity').notNullable();
            table.integer('step_id')
                .unsigned()
                .notNullable()
                .references('step_id')
                .inTable('steps')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            table.integer('ingredient_id')
                .unsigned()
                .notNullable()
                .references('ingredient_id')
                .inTable('ingredients')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
};

exports.down = async function(knex) {
    await knex.schema
        .dropTableIfExists('ingredient_quantities')
        .dropTableIfExists('ingredients')
        .dropTableIfExists('steps')
        .dropTableIfExists('recipes');
};
