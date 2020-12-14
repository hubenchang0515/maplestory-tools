import {BrowserRouter, Route} from 'react-router-dom'
import MysteryBadgeCalculator from './tool/MysteryBadgeCalculator'
import CharmChipSimulator from './tool/CharmChipSimulator'

const articleStyle = {
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
    {
        title: "咒语痕迹模拟器",
        url: "/maplestory-tools/charm-chip-simulator", 
        component: CharmChipSimulator
    },
]

function MainPage() {
    return(
        <div>
            <div className="ui sidebar inverted vertical menu visible">
            {
                toolsList.map((item, index) => {
                    return (
                        <a key={index} className="item" href={item.url}>
                            {item.title}
                        </a>
                    )
                })
            }
            </div>
            <div className="ui masthead vertical segment" style={articleStyle}>
                <BrowserRouter>
                {
                    toolsList.map((item, index) => {
                        return (
                            <Route key={index} path={item.url} exact component={item.component}/>
                        )
                    })
                }
                </BrowserRouter>
            </div>
        </div>
    )
}

export default MainPage