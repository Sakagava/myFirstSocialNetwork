import './AccountDie.css'

export default function Die({className, user, handleClickAccount}) {
    return (
        <div className={className}>
            <span><b onClick={handleClickAccount}>{user?.username}</b></span>
            <span><p onClick={handleClickAccount}>{user?.name}</p></span>
        </div>
    )
}