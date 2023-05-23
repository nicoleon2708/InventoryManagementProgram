import React, { useEffect, useState } from 'react';

function EmailVerification() {
    const [isVerified, setIsVerified] = useState(null);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('token')
        if (token) {
            fetch(`http://127.0.0.1:8000/auth/user/email-verification/?token=${token}`)
                .then(response => response.json())
                .then(data => {
                    setIsVerified(data.is_verified)
                })
                .catch(error => console.error(error))
        }
    }, []);

    return (
        <div>
            {isVerified === true && <p>Email is verified.</p>}
            {isVerified === false && <p>Email is not verified.</p>}
        </div>
    );
}

export default EmailVerification;
