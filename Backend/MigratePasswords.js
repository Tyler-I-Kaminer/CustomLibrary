const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Test data
const plainTextPassword = 'Lib2836!';
const storedBcryptHash = '$2b$10$/yJiFDbtD6T0NmKdFwUc6eiSGYNYSCVkwsFG4S4fpQ5eXLY81NweK';

// Generate the SHA-256 hash of the plain text password
const sha256Hash = crypto.createHash('sha256').update(plainTextPassword).digest('hex');
console.log('SHA-256 Hash of the Password:', sha256Hash);

// Compare the SHA-256 hash with the bcrypt hash
bcrypt.compare(sha256Hash, storedBcryptHash)
    .then(isMatch => {
        console.log('Does the SHA-256 hash match the bcrypt hash?', isMatch);
    })
    .catch(err => {
        console.error('Error comparing hashes:', err);
    });
