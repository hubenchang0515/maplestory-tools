
interface ProgressProps {
    className?: string,
    color?: string,
    text?: string,
    percent?: number, // int 0 ~ 100
}

interface ProgressBarStyle {
    transitionDuration: string,
    width: string,
}

function Progress(props: ProgressProps) {
    const m_props: ProgressProps = {
        color: "green",
        percent: 0,
        ...props
    }

    const progressBarStyle: ProgressBarStyle = {
        transitionDuration: "300ms",
        width: String(m_props.percent) + "%"
    }

    return (
        <div className={m_props.className}>
            <div className="ui eight column grid">
                <div className="column">{m_props.text}</div>
                <div className="right floated column" style={{textAlign:"right"}}>{m_props.percent}%</div>
            </div>
            <div className={"ui tiny progress " + m_props.color} data-percent={m_props.percent}>
                <div className="bar" style={progressBarStyle}></div>
            </div>
        </div>
    )
}

export default Progress;