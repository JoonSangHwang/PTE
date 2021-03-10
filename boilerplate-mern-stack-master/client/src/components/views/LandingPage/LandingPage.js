import { Card,Icon,Avatar,Col,Typography,Row } from 'antd';
import Axios from 'axios';
import React ,{useEffect,useState} from 'react'
import moment from 'moment'

const { Title } = Typography
const { Meta}  = Card;

function LandingPage() {
    const [Video, setVideo] = useState([])
    useEffect(() => {
     Axios.get('/api/video/getVideos')
     .then(respones=>{
         if(respones.data.success){
            setVideo(respones.data.videos)
         }else{
             alert('비디오 가져오기를 실패 했습니다.')
         }
     })
    }, [])
    const renderCards =Video.map((video, index)=>{
        var minutes= Math.floor(video.duration/60);
        var seconds = Math.floor((video.duration-(minutes*60)));
                     {/*lg 6이면 4개의 화면 //md 8이니까 줄어들었을때 3개의 화면*/}
        return <Col key={index} lg={6} md={8} xs={24}>
            <div style={{position: 'relative'}}>
            <a href = {`/video/${video._id}`}>
                <img style={{width: '100%'}} 
                src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail"/>
                <div className="duration">
                    <span>{minutes} : {seconds}</span>
                </div>
                </a>
            </div>
        <br/>
        <Meta
        avatar={
            <Avatar src={video.writer.image}/>
        }
        title ={video.title}
        description=""                
        />
        <span>{video.writer.name}</span><br/>
        <span style={{marginLeft:'3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM  Do YY")}</span>
        </Col>  
       
    }) 

    return (
       <div style={{width: '85%', margin: '3rem auto'}}>
           <Title level={2}>Recommended</Title>
           <hr/>
           <Row gutter={[32,16]}>
                {renderCards}
           </Row>
       </div>
    )
}

export default LandingPage
