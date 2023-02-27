import { useState } from 'react';

function Greeting({ messages }) {
    const [greeting, setGreeting] = useState(messages[0]);

    const handleClick = () => {
        const randomIndex = Math.floor(Math.random() * messages.length);
        setGreeting(messages[randomIndex]);
    };

    return (
        <div>
            <h3>{greeting}! Thank you for visiting!</h3>
            <button onClick={handleClick}>New Greeting</button>
        </div>
    );
}

export default Greeting;




