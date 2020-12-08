import React, { useEffect, useState } from 'react';
import LabelInput from '../component/LabelInput'

const globalMaxLevel:number = 20

function isPositiveInteger(text:string): boolean {
    let regexp = new RegExp("^\\d+$")
    return regexp.test(text)
}

function isInRange(text:string, begin:number, end:number): boolean {
    const value = Number(text)
    return value >= begin && value <= end
}

function createRangeValidator(begin:number, end:number): (text:string) => boolean {
    const validator = (text:string) => {
        return isPositiveInteger(text) && isInRange(text, begin, end)
    }

    return validator
}

function MysteryBadgeCalculator() {
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

    const handleLevelChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const l = Number(event.target.value)
        if(l === 0) {
            setLevel(1)
        } else {
            setLevel(l)
        }
        
    }

    const handleGrowthChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const g = Number(event.target.value)
        setGrowth(g)
    }

    const handleGetPerDayChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const p = Number(event.target.value)
        setPerDay(p)
    }

    return(
        <div>
            <h3 className="ui center aligned header">神秘徽章计算器</h3>
            <div className="ui container">
                <LabelInput
                    label="当前等级"
                    placeholder="1 ~ 20"
                    className="fluid"
                    type="number"
                    validator={createRangeValidator(1, 20)}
                    onChange={handleLevelChanged}
                />
                <br/>
                <LabelInput
                    label="成长值"
                    placeholder={"0 ~ " + maxGrowth}
                    className="fluid"
                    type="number"
                    validator={createRangeValidator(0, maxGrowth)}
                    onChange={handleGrowthChanged}
                />
                <br/>
                <LabelInput
                    label="每日获取量"
                    className="fluid"
                    type="number"
                    validator={isPositiveInteger}
                    onChange={handleGetPerDayChanged}
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

export default MysteryBadgeCalculator;