const PersonForm = ({ 
    handleSubmit,
    nameValue,
    handleNameChange,
    phoneValue,
    handlePhoneChange
}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value = {nameValue} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value = {phoneValue} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm