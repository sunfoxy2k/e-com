import React from 'react'
import ListItems from './ListItems';
import Banner from '../assets/Banner2.jpg'
const LandingPage = () => {
    return(
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto py-6 px-4 ">
                    <img className="object-cover h-64 w-full"src={Banner}/>
                </div>
                <h2 className="text-lg font-semibold text-center">OUR SPECIAL OFFERS</h2>
                <p className="mt-6 text-sm text-center">In Chicken we trust</p>
                <ListItems/>
            </div>
    );
}
export default LandingPage
