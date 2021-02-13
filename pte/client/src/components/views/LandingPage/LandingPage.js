import React from 'react'
useEffect(() => {
    axios.get('/api/hello2')
        .then(response => { console.log(response) })
}, [])
function LandingPage() {
    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
