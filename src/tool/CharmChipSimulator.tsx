// 咒语痕迹模拟器

import React, { useEffect, useState } from 'react'
import ComboBox,{ComboBoxSelection} from '../component/ComboBox'
import CheckBox from '../component/CheckBox'
import Progress from '../component/Progress'

const selections: ComboBoxSelection[] = [
    {text: "100%", value: 1.00},
    {text: "70%", value: 0.70},
    {text: "30%", value: 0.30},
    {text: "15%", value: 0.15},
]

interface Result {
    message: string,
    color: string
}

function CharmChipSimulator(): JSX.Element {
    const [basicRate, setBasicRate] = useState(0)
    const [hotTime, setHotTime] = useState(false)
    const [handSkill, setHandSkill] = useState(false)
    const [luckDay, setLuckDay] = useState(false)
    const [buttonState, setButtonState] = useState("disabled")

    const [finalRate, setFinalRate] = useState(0)

    const [resultList, setResultList] = useState<Result[]>([])

    useEffect(() => {
        if(basicRate !== undefined && basicRate !== 0) {
            setButtonState("")
        } else {
            setButtonState("disabled")
        }
    }, [basicRate])

    useEffect(() => {
        let rate = basicRate
        if(hotTime) {
            rate += rate === 0.70 ? 0.25 : 0.15
        }
        if(handSkill) {
            rate *= 1.1
        }
        if(luckDay) {
            rate *= 1.1
        }
        if(isNaN(rate)) {
            rate = 0
        }
        if(rate > 1.0) {
            rate = 1.0
        }
        setFinalRate(rate)
    }, [basicRate, hotTime, handSkill, luckDay])

    const handleClickEnhanceButton = () => {
        let result:Result = {
            message: "",
            color: ""
        }

        if(Math.random() <= finalRate) {
            result.message = "[强化] 咒语痕迹发出了一道光，装备被附上了神奇的力量。"
            result.color = "green"
        } else {
            result.message = "[强化] 咒语痕迹发出了一道光，但是装备没有发生任何变化。"
            result.color = "red"
        }
        setResultList([
            result,
            ...resultList
        ])
    }

    const handleClickSkipButton = () => {
        let result:Result = {
            message: "",
            color: ""
        }
        if(Math.random() <= finalRate) {
            result.message = "[垫卷] 咒语痕迹发出了一道光，装备被附上了神奇的力量。"
            result.color = "olive"
        } else {
            result.message = "[垫卷] 咒语痕迹发出了一道光，但是装备没有发生任何变化。"
            result.color = "yellow"
        }
        setResultList([
            result,
            ...resultList
        ])
    } 

    const handleClickClearButton = () => {
        setResultList([])
    }

    return (
        <div>
            <h3 className="ui center aligned header">咒语痕迹模拟器</h3>
            <div className="ui container">
                <ComboBox
                    className="fluid"
                    label="咒语成功率"
                    color="blue"
                    placeholder="请选择咒语痕迹的成功率"
                    selections={selections}
                    onChange={setBasicRate}
                />
                <br/>
                <div className="ui three column grid">
                    <CheckBox className="column" text="热力时间" checked={hotTime} onChange={setHotTime}/>
                    <CheckBox className="column" text="手计加成10%" checked={handSkill} onChange={setHandSkill}/>
                    <CheckBox className="column" text="幸运日加成10%" checked={luckDay} onChange={setLuckDay}/>
                </div>
                <br/>
                <Progress
                    text="综合成功率"
                    color="green"
                    percent={Math.round(finalRate * 100)}
                />
                <br/>
                <div className="ui eight column grid">
                    <div className="column">
                        <button className={"ui primary button " + buttonState} onClick={handleClickEnhanceButton}>强化</button>
                    </div>
                    <div className="column">
                        <button className={"ui column secondary button " + buttonState} onClick={handleClickSkipButton}>垫卷</button>
                    </div>
                    <div className="right floated column">
                        <button className={"ui column secondary button "} onClick={handleClickClearButton}>清空</button>
                    </div>
                </div>
                <br/>
                {
                    resultList.map((item, index) => {
                        return (
                            <div key={index} className={"ui fluid message " + item.color}>{item.message}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CharmChipSimulator