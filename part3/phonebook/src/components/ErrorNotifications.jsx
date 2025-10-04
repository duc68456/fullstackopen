import ErrorNotification from './ErrorNotification'

const ErrorNotifications = ({ messages }) => {
    if (messages.length == 0)
        return null
    return (
        <div>
            {messages.map((message, idx) => <ErrorNotification key={idx} message={message} />)}
        </div>
    )
}

export default ErrorNotifications