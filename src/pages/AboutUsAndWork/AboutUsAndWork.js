import React, { Component } from 'react'
import closeIcon from '../../assets/closeIcon.png';
import './AboutUsAndWork.css'
export default class AboutUsAndWork extends Component {

    aboutUs() {
        window.open("https://mangeshdatar.netlify.app/");
    }
    render() {
        console.log(this.props.modalView)
        return (
            <div>
                <span className="crossIcon" onClick={e => this.props.handleClose()}>  <img className="crossimg" src={closeIcon} width="40px" height="40px" alt="" />  </span>
                <div className="aboutUsContainer">
                    {this.props.modalView ?
                        <div className="aboutUsLable">
                            <span> We're freelance developer's ,</span> 
                            <span>We always contribute to open source project's.</span>
                            <div  className="reachOutLable" onClick={this.aboutUs}>
Reach Out to Me!!!
</div>
                        </div> :
                        <div className="videoContainer">
                        <iframe src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                            frameborder='0'
                            allow='autoplay; encrypted-media'
                            allowfullscreen
                            title='video'
                        />
                    </div>}
                
                </div>
            </div>
        )
    }
}
