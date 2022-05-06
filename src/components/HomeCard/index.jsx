import Typography from 'geeky-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'
import "./homeCard.scss"

function HomeCard({ link, title, image }) {
    return (
        <Link to={link}>
            <div className='GsHomeCard'>
                <img src={image} alt="placeholder" />
                <Typography variant={"h6"}>{title}</Typography>
            </div>
        </Link>
    )
}

export default HomeCard
