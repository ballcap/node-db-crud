const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000; // Use environment port or 3000

const config = {
    user: "avnadmin",
    password: "AVNS_AXUkLLJRuRTkJyz7rc5",
    host: "pg-1dae0a96-burneract-ef64.e.aivencloud.com",
    port: 12971,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUOVnSDDJFB9C5BLzdVQxhk588OaUwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZjQ3MjgwYjEtNjA4Yi00MWM5LTg2MDUtMmY2OTNkNTY0
OGQ4IFByb2plY3QgQ0EwHhcNMjQwNzAyMDQzNzQyWhcNMzQwNjMwMDQzNzQyWjA6
MTgwNgYDVQQDDC9mNDcyODBiMS02MDhiLTQxYzktODYwNS0yZjY5M2Q1NjQ4ZDgg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAJet8mka
q84b5JG2ZQu//N2ZkQVw9zrVJu5Kw6pSNpm2LX3PMsVsnRkLQ4BPwFiBil3CEQfo
CrnAd/UYp59OiEbjbd+Y3mc6qzwmi8WVXnPaaauRZ31t6VNSKgOhxeu3H4Pr26jm
ZaziJQYCpZcTB+eVX9sqysGiNgbuOYtSAQShI2IluJptUpEYo1CFqMBJOHYCJx1d
FEnYPs0FuTT9Uyk7ilpqK+hQulaeae0vhuZ52xG5ul5pdkoD0amUIgb+N9xjFG7C
cA7gHMYzbIOAlxQ1HJSU++zMinmP7ynvS5KpSnJ5Gj1vPTwYtgWu1CKVkOQwFsvg
gQ9eWpGn6J7UKKI44ZfKWQcmr8d8nvKrWbHe/eD85FqxgfDUcFeJrBr389hg/aeX
LaWNK4xXgX3PIsQeIf2/5j1rOeLzweRAzOn25Sb7rVjFdCHBrZPVNFZefEX7BoFu
XofCEI0V7GbhUH4dYr6tEQ8SV2v9YcZlfrBumRI7NRDbcEOGVTi5LTn3qwIDAQAB
oz8wPTAdBgNVHQ4EFgQUmrdUqsF8+Iis8iwCk+ZhSX9BUHMwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBADfZMQkih3mti+X6
2ukeWj7mVBJ6h81rifCpO/Z9E3m4XYEucwro4iB9a+SGtMTqmIgVGMqgfdXgZes/
y9kHN5GaKdUSfgwUQ2sK/90knACehLbaNMfVkp5hSD53ekhmKe8AIabg6jI2/KG4
07PZM8+fzOoI1+guc0jg/wdX4vEwAaZuzhWnhPACPkmPm1uvti//87OP11gFOtNf
58nkf2O3EWb+yoOn2faN/Q733rjCBm5n7HDnbgXcGnfiCs94uzvkLBSOVkAMqQ53
iOibNfpMyQDMgZXVlcEIOxWD4duV4JGpFsXVukRJqOpJu0ZjxA4c/2mHxKCcRWSq
0/+v/n4015bfjVcSeriFXX2MWBaKrzsy146axdjFhR/U2QnfK5548uQC473YDlzp
TMvaUFR19K6mYYXYvU/JP/3pxu7VF617/H3mFt+gULcNE0y302IfITR0LdIreZQH
wp3uYUuQsnZrlow+x/cPg5APG8yxQfgm3bMj9vwAtufNIaJJkA==
-----END CERTIFICATE-----`,
    },
};

const pool = new Pool(config);

app.get('/chats', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM chats");
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on https://node-db-crud.onrender.com`);
});
