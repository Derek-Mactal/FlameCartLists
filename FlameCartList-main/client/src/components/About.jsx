import { Link} from "@reach/router";

const Item = (props) => {
    return (

        <div >
            <h6 className="return">
                <Link to="/dash">Return to DashBoard</Link>
            </h6>
            <div className="display-main">
                <div className="details">
                    <div className ="aboutDiv">
                        <h1>-About Us-</h1>
                        <p>I mean, who wouldn't want to know our story.</p>
                    </div>
                    <div className="aboutBottom">
                        <p>With all the demand life puts us through, its easy to get distracted and incredibly <span>unorganzied</span>. Our founders at FlameCart endured many restless nights stressing over the fact that their life was in complete shambles cause of this disorganization. The only sensible solution was to find an online resource that conveniently organizes all and any items into separate categorized lists. To their surprise, nobody has capitalized on this idea! They instantly got to work, and after a week of development they created the greatest <span>FREE</span> online list organizer known to mankind. Now just about anyone can visit our website and seamlessly create and sort their items into categorized lists.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;