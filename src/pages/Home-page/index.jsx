import React from 'react'
import AppBar from '../../components/Appbar'
import HomeCard from '../../components/HomeCard'
import { useAppContext } from '../../context/AppContext';
import "./homePage.scss"

function HomePage() {
    const { categoryName } = useAppContext();

    return (
        <>
            <AppBar />
            <div className="GsContainer">
                <div className="GsHomePage">
                    {categoryName?.map((category) => (
                        <HomeCard key={category.name} link={`/products/${category.name}`} title={category.name} image={category.image} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default HomePage
