import {BrowserRouter, Route} from 'react-router-dom'
import MysteryBadgeCalculator from './tool/MysteryBadgeCalculator'

const articleStype = {
    marginLeft: "300px",
    marginRight: "100px",
}

interface ToolNode {
    title: string,
    url: string,
    component: () => JSX.Element
}

// 映射表
const toolsList: ToolNode[] = [
    {
        title: "神秘徽章计算器",
        url: "/maplestory-tools/mystery-badge-calculator", 
        component: MysteryBadgeCalculator
    },
]

function MainPage() {
    return(
        <div>
            <div className="ui sidebar inverted vertical menu visible">
            {
                toolsList.map((item) => {
                    return (
                        <a className="item" href={item.url}>
                            {item.title}
                        </a>
                    )
                })
            }
            </div>
            <div className="ui masthead vertical segment" style={articleStype}>
                <BrowserRouter>
                    {
                        toolsList.map((item) => {
                            return (
                                <Route path={item.url} exact component={item.component}/>
                            )
                        })
                    }
                </BrowserRouter>
            </div>
        </div>
    )
}

export default MainPage