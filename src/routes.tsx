import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import MysteryBadgeCalculator from './tool/MysteryBadgeCalculator'

function Routes(props: any) {
    return (
        <BrowserRouter>
            <Route path='/' exact component={MysteryBadgeCalculator}/>
        </BrowserRouter>
    )
}

export default Routes