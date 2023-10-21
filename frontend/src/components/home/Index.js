import React from 'react'
import Slider from './Slider'
import Feature from './Feature'
import Tracking from './Tracking'
import Sync from './Sync'
import Pricing from './Pricing'
import Services from './Services'
const Index = () => {
    return (
        <div>
            <Slider />
            <Services/>
            <Feature />
            <Tracking />
            <Sync/>
            <Pricing/>
        </div>
    )
}

export default Index
