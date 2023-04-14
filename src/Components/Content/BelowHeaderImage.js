import "./Content.scss"

const BelowHeaderImage = (props) => {

    const {headline} = props

    return (
        <div className="belowHeader">
            <h1>{headline}</h1>
        </div>
    )
}

export {BelowHeaderImage}