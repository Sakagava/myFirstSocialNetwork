import './PageAllAccounts.css'
import ChangeInput from '/Разработка/Коды/React/firstAssinc/firstAssync/src/components/inputs/ChangeInput'

function PageAllAccounts({users, handleClickAccount, handleChange}) {

    return (
        <div className="accounts">
            <ChangeInput 
                handleChange = { handleChange }
            />
            {users.map(user => {
                return (
                    <div 
                        className="accounts_account" 
                        key = {user.id} 
                        id = {user.id} 
                        onClick={handleClickAccount}
                    >
                        <div className="accounts_account_img">
                            <img src={`/src/assets/usersPhoto/photo${user.id}.jpeg`} alt="" />
                        </div>
                        <span className='accounts_account_username'>
                            <h1>{user.username}</h1>
                        </span>
                        <span className='accounts_account_name'>
                            <h3>{user.name}</h3>
                        </span>
                    </div>
                )
            })}
        </div>
    )
}

export default PageAllAccounts