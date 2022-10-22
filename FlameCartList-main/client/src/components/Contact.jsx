import { Link} from "@reach/router";
import { useState } from "react";
import axios from 'axios'

const Item = (props) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [message,setMessage]=useState('')
    const sumbit=async (e)=>{
        e.preventDefault();
        let contact={name,email,message}
        console.log(contact)
        try{
            let res= await axios.post(`http://localhost:8000/api/contact`,contact)
            console.log(res)
            console.log('success')
            setName('')
            setEmail('')
            setMessage('')
        }
        catch(err){
            console.log(err)
            console.log('failed')
        }
    }
    return (
        <>
            <h6 className="return">
                <Link to="/dash">Return to DashBoard</Link>
            </h6>
            <div className="display-main">
                <div className="details">
                    <div className="contactDiv">
                        <form onSubmit={sumbit}>
                            <h2>Get in Touch</h2>
                            <p>Please fill out the quick form to contact us!</p>
                            <input type = "text" placeholder = "Name" value={name} onChange={e=>setName(e.target.value)} style={{marginTop:'-20px'}}/>
                            <input type = "email" placeholder = "Your Email Address" value={email} onChange={e=>setEmail(e.target.value)} style={{marginTop:'20px'}}/>
                            <textarea placeholder = "Message" value={message} onChange={e=>setMessage(e.target.value)} style={{marginTop:'20px'}}/>
                            <br/>
                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                    <div className="connectDiv">
                        <h2>Connect:</h2>
                        <div className="connectInfo">
                            <p>For support or questions: </p>
                            <p>Email us at</p>
                            <p><a style={{ color: "white", textDecorationLine: "none" }} href ="mailto:flamecartinc@gmail.com">flamecartinc@gmail.com</a></p>
                        </div>
                        <h2>Or Call Us:</h2>
                        <div className="connectInfo">
                            <p>FlameCart Inc,</p>
                            <a style={{ color: "white", textDecorationLine: "none" }} href="#">1(352)-652-2287</a>
                        </div>
                        <h3>FlameCartCo</h3>
                        <p>420 Terry Ave N</p>
                        <p>Seattle, WA 98109</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Item;
