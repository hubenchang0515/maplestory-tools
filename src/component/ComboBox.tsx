import React, { useEffect, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

export interface ComboBoxSelection {
    text: string,
    value: any,
}

interface ComboBoxProps {
    className?: string,
    color?: string,
    label?: string,
    placeholder?: string,
    selections?: ComboBoxSelection[],
    onChange?: (v: any) => void,
}

const dropdownStyle = {
    borderTopLeftRadius: "0",
    borderBottomLeftRadius: "0",
}

function ComboBox(props:ComboBoxProps): JSX.Element {
    const m_props: ComboBoxProps = {
        className: "",
        color: "blue",
        label: "ComboBox",
        placeholder: "",
        ...props
    }
    const [value, setValue] = useState<any>(undefined)
    const [text, setText] = useState(m_props.placeholder)
    const [isShow, setShow] = useState(false)

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setShow(!isShow)

        // 阻止事件冒泡，避免触发全局点击事件，导致下拉框收缩
        event.nativeEvent.stopImmediatePropagation() 
    }

    const createSelectHandler = (text:string, value:any) => {
        return (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setShow(false)
            setValue(value)
            setText(text)
        }
    }

    // 全局点击事件，收缩下拉框
    useEffect(() => {
        document.addEventListener('click', (e:MouseEvent) => {
            setShow(false)
        });   
    }, [])

    const onChange = m_props.onChange
    useEffect(() => {
        if(onChange !== undefined) {
            onChange(value)
        }
    }, [value, onChange])

    return(
        <div className={"ui labeled input " + m_props.className}>
            <div className={"ui label " + m_props.color}>{m_props.label}</div>
            <CSSTransition
                in={isShow}
                timeout={200}
                classNames={{
                    enterActive:"active",
                    enterDone:"active visible"
                }}
            >
                <div className={"ui selection dropdown " + m_props.className} onClick={handleClick} style={dropdownStyle}>
                    <input type="hidden"/>
                    <i className="dropdown icon"></i>
                    <div className="default text">{text}</div>
                    <CSSTransition
                        in={isShow}
                        timeout={200}
                        classNames={{
                            enterActive:"active visible animating slide down in",
                            enterDone:"active visible",
                            exitActive:"active visible animating slide down out"
                        }}
                    >
                        <div className="menu transition">
                        {
                            m_props.selections?.map((item, index) => {
                                return(
                                    <div key={index} 
                                        className="item" 
                                        data-value={item.value} 
                                        onClick={createSelectHandler(item.text, item.value)}
                                    >
                                        {item.text}
                                    </div>
                                )
                            })
                        }
                        </div>
                    </CSSTransition>
                </div>
            </CSSTransition>
        </div>
    )
}

export default ComboBox