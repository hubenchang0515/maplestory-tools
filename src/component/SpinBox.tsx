import React, { useEffect, useState } from 'react'

interface SpinBoxProps {
    className?: string,
    color?: string,
    label?: string,
    value?: number,
    min?: number,
    max?: number,
    onChange?: (value: number) => void,
}

function SpinBox(props:SpinBoxProps): JSX.Element {
    const m_props: SpinBoxProps = {
        className: "",
        color: "blue",
        label: "SpinBox",
        ...props
    }
    const [value, setValue] = useState(m_props.value ?? m_props.min ?? m_props.max ?? 0)
    const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(event.target.value))
    }

    const onChange = m_props.onChange
    useEffect(() => {
        if(onChange !== undefined) {
            onChange(value)
        }
    }, [value, onChange])

    return(
        <div className={"ui labeled input " + m_props.className}>
            <div className={"ui label " + m_props.color}>{m_props.label}</div>
            <input 
                type="number"
                value={value}
                min={m_props.min}
                max={m_props.max}
                onChange={handleValueChanged}
            />
        </div>
    )
}

export default SpinBox