import React from 'react'
import latam from '../../translations/latam.json'

const withTranslation = Component => props => {
  var userLang = navigator.language || navigator.userLanguage; 
  const languages = {
    'es-419': latam
  }

  /**
   * t Translation
   * @param {*} key 
   * @param {*} variable 
   * @returns 
   */
  const t = (key, variable = "{$}") => {
    const keyWithVariable = key.replace(`${variable}`, "{$}");

    const traducc = languages[`${userLang}`][`${keyWithVariable}`] || key

    const traduccWithVariable = traducc.replace("{$}", variable);

    return traduccWithVariable
  }


  
  return <Component t={t} {...props} />
}

export default withTranslation
