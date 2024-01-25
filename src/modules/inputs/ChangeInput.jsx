import './ChangeInput.css'

function ChangeInput({ handleChange }) {
    return (
        <div className="changeInput">
            <form action="">
                <label htmlFor="">Sort by: </label>
                <select name="" id="" onChange={handleChange}>
                    <option value="name">Name</option>
                    <option value="userName">User Name</option>
                </select>
            </form>
        </div>
    )
}

export default ChangeInput