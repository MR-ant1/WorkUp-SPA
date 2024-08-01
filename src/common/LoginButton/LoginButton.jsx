import "./LoginButton.css"
// eslint-disable-next-line react/prop-types
export const LoginButton = ({ className, title, emitFunction }) => {

    return (
        <div className={className} onClick={emitFunction}>
            {title}
        </div>
    )
}