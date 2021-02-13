import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage() {
    useEffect(() => {
        axios.get('/api/hello2')
            .then(response => { console.log(JSON.stringify(response)) })
    }, [])

    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
