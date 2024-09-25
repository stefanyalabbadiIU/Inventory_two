import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const setupDatabase = () => {
    return open({
        filename: './public/database/products.db',
        driver: sqlite3.Database
    }).then(db => {
        return db.exec(`
            DROP TABLE IF EXISTS products;
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                description TEXT,
                price REAL,
                category TEXT,
                image_path TEXT,
                availability TEXT DEFAULT 'In Stock'
            )
        `).then(() => {
            return db.get(`SELECT COUNT(*) as count FROM products`);
        }).then(row => {
            if (row.count === 0) {
                return db.run(`
                    INSERT INTO products (name, description, price, category, image_path, availability)
                    VALUES
                    ('Espresso', 'Strong and rich espresso made with freshly ground beans.', 2.50, 'Coffee', '/images/espresso.png', 'In Stock'),
                    ('Cappuccino', 'A smooth blend of espresso, steamed milk, and foam.', 3.50, 'Coffee', '/images/cappuccino.png', 'Out of Stock'),
                    ('Latte', 'Creamy latte made with steamed milk and a shot of espresso.', 4.00, 'Coffee', '/images/latte.png', 'In Stock'),
                    ('Mocha', 'Espresso with chocolate syrup, steamed milk, and whipped cream.', 4.50, 'Coffee', '/images/mocha.png', 'In Stock'),
                    ('Iced Coffee', 'Chilled brewed coffee served over ice.', 2.75, 'Coffee', '/images/iced_coffee.png', 'Out of Stock'),
                    ('Matcha Latte', 'Steamed milk with high-quality matcha green tea.', 4.75, 'Tea', '/images/matcha_latte.png', 'In Stock'),
                    ('Chai Tea Latte', 'Spiced black tea mixed with steamed milk.', 4.25, 'Tea', '/images/chai_latte.png', 'In Stock'),
                    ('Blueberry Muffin', 'Freshly baked muffin with juicy blueberries.', 2.75, 'Pastry', '/images/blueberry_muffin.png', 'In Stock'),
                    ('Croissant', 'Flaky, buttery croissant freshly baked.', 3.00, 'Pastry', '/images/croissant.png', 'Out of Stock'),
                    ('Bagel with Cream Cheese', 'Toasted bagel served with a side of cream cheese.', 3.50, 'Pastry', '/images/bagel.png', 'In Stock')
                `);
            } else {
                console.log('Products already exist, skipping insertion.');
            }
        }).then(() => {
            console.log('Coffee shop database setup complete.');
        });
    });
};




export const getDbConnection = () => {
    return open({
        filename: './public/database/products.db',
        driver: sqlite3.Database
    });
};
