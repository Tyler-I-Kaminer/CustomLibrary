const bcrypt = require('bcrypt');
const crypto = require('crypto');

const plainTextPassword = 'Lib2836!';
const storedBcryptHash = '$2b$10$/yJiFDbtD6T0NmKdFwUc6eiSGYNYSCVkwsFG4S4fpQ5eXLY81NweK';

// Hash the plain text password using SHA-256
const sha256Hash = crypto.createHash('sha256').update(plainTextPassword).digest('hex');

// Compare the SHA-256 hash with the stored bcrypt hash
bcrypt.compare(sha256Hash, storedBcryptHash)
    .then(isMatch => {
        console.log('Is double-hashing the issue?', isMatch); // true means it was double-hashed
    })
    .catch(err => {
        console.error('Error comparing hashes:', err);
    });
