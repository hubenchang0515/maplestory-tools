import React, { useState } from 'react'

interface LabelInputProps {
    label?: string,
    placeholder?: string,
    className?: string,
    type?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    validator?: (value: string) => boolean,
}

function LabelInput(props:LabelInputProps): JSX.Element {
    const [color, setColor] = useState("blue")
    const [inputClass, setInputClass] = useState("")

    const handleValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(props.validator !== undefined && event.target.value !== "" && !props.validator(event.target.value)) {
            setColor("red")
            setInputClass("error")
            return
        }

        setColor("blue")
        setInputClass("")
        
        if(props.onChange !== undefined) {
            props.onChange(event)
        }
    }

    return(
        <div className={"ui labeled input " + props.className + " " + inputClass}>
            <div className={"ui label " + color}>{props.label}</div>
            <input 
                type={props.type === undefined ? "text" : props.type} 
                placeholder={props.placeholder} 
                onChange={handleValueChanged}
            />
        </div>
    )
}

export default LabelInput