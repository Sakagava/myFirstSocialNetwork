import './Account.css'

export default function Die({className, user}) {
    return (
        <div className={className}>
            <span><b>{user?.username}</b></span>
            <span><p>{user?.name}</p></span>
        </div>
    )
}