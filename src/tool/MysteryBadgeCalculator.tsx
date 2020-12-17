// 神秘徽章计算器

import React, { useEffect, useState } from 'react'
import SpinBox from '../component/SpinBox'

const globalMaxLevel:number = 20

function MysteryBadgeCalculator(): JSX.Element {
    const [level, setLevel] = useState(1)
    const [growth, setGrowth] = useState(0)
    const [need, setNeed] = useState(0)
    const [perDay, setPerDay] = useState(0)
    const [maxGrowth, setMaxGrowth] = useState(0)

    useEffect(() => {
        setMaxGrowth((level > 0 && level < globalMaxLevel ? Math.pow(level, 2) + 11 : 0))
    }, [level])

    useEffect(() => {
        let n = 0
        for(let i = level; i < globalMaxLevel; i++){
            n += Math.pow(i, 2) + 11
        }
        setNeed(n - growth)
    }, [level, growth])

    const handleLevelChanged = (value: number) => {
        if(value < 1) {
            setLevel(1)
        } else if(value > globalMaxLevel) {
            setLevel(globalMaxLevel)
        } else {
            setLevel(value)
        }
    }

    const handleGrowthChanged = (value: number) => {
        setGrowth(value <= maxGrowth ? value : maxGrowth)
    }

    const handleGetPerDayChanged = (value: number) => {
        setPerDay(value)
    }

    return(
        <div>
            <h3 className="ui center aligned header">神秘徽章计算器</h3>
            <div className="ui container">
                <SpinBox
                    label="当前等级"
                    className="fluid"
                    onChange={handleLevelChanged}
                    min={1}
                    max={20}
                />
                <br/>
                <SpinBox
                    label="成长值"
                    className="fluid"
                    onChange={handleGrowthChanged}
                    min={0}
                    max={maxGrowth}
                />
                <br/>
                <SpinBox
                    label="每日获取量"
                    className="fluid"
                    onChange={handleGetPerDayChanged}
                    min={0}
                />
                <br/>
                <div className="ui segment">
                    {
                        need === 0 ? <>恭喜你，神秘徽章已经满级啦！</>:
                        perDay <= 0 ? <>你的神秘徽章距离满级还差 <span className="ui pink label">{need}</span> 点成长值。</>:
                        <>你的神秘徽章距离满级还差 <span className="ui pink label">{need}</span>点成长值，达到满级还需要 <span className="ui pink label">{Math.ceil(need/perDay)}</span> 天。</>
                    }
                </div>
            </div>
        </div>
    );
}

export default MysteryBadgeCalculator