import React, {useEffect, useState} from 'react';

function AuthPage() {
    const [data, setData] = useState();
    const get_text = async () => {
        console.log("Обращение к бэкенду")
        try {
            const response = await fetch(`http://87.228.36.55/api/`)

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