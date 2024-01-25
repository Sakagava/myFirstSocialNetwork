import './PageAllAccounts.css'

function Accounts({users, handleClickAccount}) {
    function handleClick(e) {
        const userId = Number(e.target.closest('.accounts_account').id)
        setPage('Account')
        setCurrentUser(users.find(user => user.id === userId));
      }
    return (
        <div className="accounts">
            {users.map(user => {
                return (
                    <div className="accounts_account" key = {user.id} id = {user.id}>
                        <div className="accounts_account_img">
                            <img src={`/src/assets/usersPhoto/photo${user.id}.jpeg`} onClick={handleClickAccount} alt="" />
                        </div>
                        <span className='accounts_account_username'>
                            <h1 onClick={handleClickAccount}>{user.username}</h1>
                        </span>
                        <span className='accounts_account_name'>
                            <h3 onClick={handleClickAccount}>{user.name}</h3>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default Accounts