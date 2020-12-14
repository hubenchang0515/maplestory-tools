// 咒语痕迹模拟器

import React, { useEffect, useState } from 'react'
import SpinBox from '../component/SpinBox'
import ComboBox,{ComboBoxSelection} from '../component/ComboBox'
import CheckBox from '../component/CheckBox'

const selections: ComboBoxSelection[] = [
    {text: "100%", value: 1.00},
    {text: "70%", value: 0.70},
    {text: "30%", value: 0.30},
    {text: "15%", value: 0.15},
]

function CharmChipSimulator(): JSX.Element {
    return (
        <div>
            <h3 className="ui center aligned header">咒语痕迹模拟器</h3>
            <div className="ui container">
                <SpinBox
                    className="fluid"
                    label="最大强化次数"
                    color="blue"
                    value={8}
                    min={1}
                />
                <br/>
                <ComboBox
                    className="fluid"
                    label="咒语成功率"
                    color="blue"
                    placeholder="请选择咒语痕迹的成功率"
                    selections={selections}
                />
                <br/>
                <div className="ui grid">
                    <CheckBox className="four wide column" text="热力时间"/>
                    <CheckBox className="four wide column" text="手计加成10%"/>
                    <CheckBox className="four wide column" text="幸运日加成10%"/>
                </div>
            </div>
        </div>
    )
}

export default CharmChipSimulator