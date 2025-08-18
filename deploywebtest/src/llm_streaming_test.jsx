// StreamComponent.jsx
import React, {useState} from 'react';

function StreamComponent() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [controller, setController] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLoading) {
            controller.abort();
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setOutput('');

        const newController = new AbortController();
        setController(newController);

        try {
            const response = await fetch('http://87.228.36.55/api/stream/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({prompt: input}),
                signal: newController.signal,
            });

            if (!response.ok) throw new Error('Ошибка сети');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const {done, value} = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                setOutput(prev => prev + chunk);
            }
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Ошибка:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Введите запрос"
                />
                <button type="submit">
                    {isLoading ? 'Остановить' : 'Отправить'}
                </button>
            </form>
            <div>
                <h3>Ответ:</h3>
                <p>{output}</p>
            </div>
        </div>
    );
};

export default StreamComponent;