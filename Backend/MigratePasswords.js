const bcrypt = require('bcrypt');
const db = require('./models/db'); // Adjust this path to your database connection file

(async () => {
    try {
        // Fetch all users and their PasswordHash values
        const [users] = await db.query('SELECT UserID, PasswordHash FROM Users');

        for (const user of users) {
            const userId = user.UserID;
            const currentPasswordHash = user.PasswordHash;

            // Skip rehashing if the PasswordHash is already bcrypt (starts with "$2b$")
            if (currentPasswordHash.startsWith('$2b$')) {
                console.log(`User ${userId}: Already migrated.`);
                continue;
            }

            // Rehash the current PasswordHash (assumes it's plaintext or SHA-256 hash)
            const bcryptHash = await bcrypt.hash(currentPasswordHash, 10);

            // Update the database with the bcrypt hash
            await db.query('UPDATE Users SET PasswordHash = ? WHERE UserID = ?', [bcryptHash, userId]);

            console.log(`User ${userId}: PasswordHash migrated.`);
        }

        console.log('Password migration completed successfully.');
    } catch (error) {
        console.error('Error during password migration:', error);
    } finally {
        process.exit();
    }
})();
