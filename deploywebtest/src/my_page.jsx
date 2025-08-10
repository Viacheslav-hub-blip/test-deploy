import React, {useEffect, useState} from 'react';

function AuthPage() {
    const [data, setData] = useState();
    const get_text = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setData(data);
        } catch {

        }

    };

    useEffect(() => {
        get_text()
    }, []);

    return (
        <>
            {data ? (
                <>
                    <h2>
                        {data}
                    </h2>
                </>
            ) : (
                <>
                    <h2>не загружено</h2>
                </>
            )}
        </>
    );
}

export default AuthPage;