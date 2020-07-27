// @ts-nocheck
import { debounce } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useAddressPredictions(input) {
    const isClient = typeof window === 'object'
    const [predictions, setPredictions] = useState([])

    const autocomplete = useRef()

    if (isClient && window && !autocomplete.current) {
        autocomplete.current = new window.google.maps.places.AutocompleteService({
            types: ['(cities)'],
            componentRestrictions: { country: ['us', 'ca'] },
            // fields: ['address_components', 'formatted_address'],
        })
    }

    function getPlacePredictions(input) {
        if (!input) {
            setPredictions([])
        } else if (autocomplete && autocomplete.current) {
            autocomplete.current.getPlacePredictions({ input }, (predictions) => {
                if (predictions && predictions.length > 0) {
                    setPredictions(predictions)
                }
            })
        }
    }

    const debouncedGetPlacePredictions = useCallback(debounce(getPlacePredictions, 500), [])

    useEffect(() => {
        debouncedGetPlacePredictions(input)
    }, [input])

    return predictions
}
