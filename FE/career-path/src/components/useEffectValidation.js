import {useEffect} from "react";

export const useEffectValidation = (input, regex, setValid) => {
    useEffect(() => {
        if (!input) {
            setValid(false);
        } else if (regex.test(input)) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [input, setValid, regex]);
}