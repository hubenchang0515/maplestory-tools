import { useEffect, useState } from "react"

interface CheckBoxProps {
    text?: string
    className?: string
    checked?: boolean
    onChange?: (checked:boolean) => void
}

function CheckBox(props: CheckBoxProps) {
    const m_props = {
        text: "CheckBox",
        className: "",
        checked: false,
        ...props
    }

    const [checked, setChecked] = useState(m_props.checked)

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setChecked(!checked)
    }

    const onChange = m_props.onChange
    useEffect(() => {
        if(onChange !== undefined) {
            setChecked(checked)
        }
    }, [checked, onChange])

    return (
        <div className={props.className}>
            <div className="ui checkbox " onClick={handleClick}>
                <input type="checkbox" checked={checked}/>
                <label>{m_props.text}</label>
            </div>
        </div>
    )
}

export default CheckBox