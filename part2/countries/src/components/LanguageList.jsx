import LanguageLine from './LanguageLine.jsx'

const LanguageList = ({languages}) => {
    return (
        <ul>
            {languages.map(language => 
                <LanguageLine key={language} language={language} />
            )}
        </ul>
    )
}

export default LanguageList