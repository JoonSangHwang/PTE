import React, {useEffect} from 'react';
import axios from 'axios';

function LandingPage(props) {
    // useEffect(() => {
    //     axios.get('/api/hello2')
    //         .then(response => { console.log(JSON.stringify(response)) })
    // }, [])
    const onClickHandler = () =>{
        axios.get('api/users/logout')
        .then(response=>{
            if(response.data.success){
                props.history.push("/login")
            }else{
                alert('Failed to logout')
            }
        })
    }
    return (
        <div style={{
            display: 'flex', justifyContent : 'center', alignItems : 'center'
            ,width: '100%', height : '100vh'
        }}>
            <h2>시작 페이지</h2>
            <button onClick={onClickHandler}>
                로그인
            </button>
        </div>
    )
}

export default LandingPage
