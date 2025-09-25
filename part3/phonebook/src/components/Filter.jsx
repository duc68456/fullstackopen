const Filter = ({
    searchValue,
    handleSearchChange
}) => {
    return (
        <div>
            filter shown with 
            <input type="search" value={searchValue} onChange={handleSearchChange}></input>
        </div>
    )
}

export default Filter