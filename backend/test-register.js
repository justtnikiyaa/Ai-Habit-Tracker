import http from 'http';

const testRegister = () => {
    const data = JSON.stringify({
        name: 'NewTestUser',
        email: 'newtest@example.com',
        password: 'password123'
    });

    const options = {
        hostname: 'localhost',
        port: 8000,
        path: '/api/auth/register',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = http.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
            responseData += chunk;
        });
        
        res.on('end', () => {
            console.log('Status:', res.statusCode);
            console.log('Response:', responseData);
            process.exit(0);
        });
    });

    req.on('error', (error) => {
        console.error('Error:', error.message);
        process.exit(1);
    });

    req.write(data);
    req.end();
};

testRegister();
