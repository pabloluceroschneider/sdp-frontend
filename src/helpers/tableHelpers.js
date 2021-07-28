import React from 'react';

export const get = (object, attr, ESCAPE = '?') => object ? object[attr] : ESCAPE;

export const validateObject = object => object && Object.entries(object).length

export const InfoError = ({value}) => <div>{`Visite la pestaña de ${value} para cargar los datos`}</div>