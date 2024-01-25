import './PageAccount.css'

export default function PageAccount({user}) {
    return (
        <div className='account'>
            <div className='account_title title'>
                <h1>{user.name}</h1>
            </div>
            <div className='account_mainInfo'>
                <span className='account_mainInfo_img'>
                    <img src={`/src/assets/usersPhoto/photo${user.id}.jpeg`} alt="" />
                </span>
                <div className='account_mainInfo_name'>
                    <h3>Name</h3>
                    <p>{user.name}</p>
                </div>
                <div className='account_mainInfo_email'>
                    <h3>Email:</h3>
                    <p>{user.email}</p>
                </div>
                <div className='account_mainInfo_phone'>
                    <h3>Phone:</h3>
                    <p>{user.phone}</p>
                </div>
                <div className='account_mainInfo_website'>
                    <h3>Website:</h3>
                    <p>{user.website}</p>
                </div>
            </div>
            <div className='account_info_adress'>
                <div className='account_info_adress_title title'>
                    <h2>Address:</h2>
                </div>
                <div className='account_info_adress_street'>
                    <h3>Street:</h3>
                    <p>{user.address.street}</p>
                </div>
                <div className='account_info_adress_suite'>
                    <h3>Suite:</h3>
                    <p>{user.address.suite}</p>
                </div>
                <div className='account_info_adress_city'>
                    <h3>City:</h3>
                    <p>{user.address.city}</p>
                </div>
                <div className='account_info_adress_zipcode'>
                    <h3>Zipcode:</h3>
                    <p>{user.address.zipcode}</p>
                </div>
                <div className='account_info_adress_lat'>
                    <h3>Lat:</h3>
                    <p>{user.address.geo.lat}</p>
                </div>
                <div className='account_info_adress_lng'>
                    <h3>Lng:</h3>
                    <p>{user.address.geo.lng}</p>
                </div>
            </div>
            <div className='account_info_company'>
                <div className='account_info_company_title title'>
                    <h2>Company:</h2>
                </div>
                <div className='account_info_company_name'>
                    <h3>Name:</h3>
                    <p>{user.company.name}</p>
                </div>
                <div className='account_info_company_catchPhrase'>
                    <h3>CatchPhrase:</h3>
                    <p>{user.company.catchPhrase}</p>
                </div>
                <div className='account_info_company_bs'>
                    <h3>Bs:</h3>
                    <p>{user.company.bs}</p>
                </div>
            </div>
        </div>
    )
}