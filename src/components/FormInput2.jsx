import "./css/formInput2.css"
import {useState} from "react";
import {
    faCheck,
    faTimes,
    faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FormInput(props) {
    const [focused,setFocused] = useState(false)
    const { label, errorMessage, validInput, inputState, onChange, id,...inputProps} = props;


    return (
        <div className="formInput">
            <label htmlFor={label}>{label}
                <FontAwesomeIcon
                    icon={faCheck}
                    className={validInput ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                    icon={faTimes}
                    className={validInput || !inputState ? "hide" : "invalid"}
                />
            </label>
            <input
                {...inputProps}
                onChange={onChange}
                aria-invalid={validInput ? "false" : "true"}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}

            />
            <p
                id={inputProps.id}
                className={ focused && inputState && !validInput ? "instructions" : "offscreen"}
            >{errorMessage}</p>
        </div>
    );
}

export default FormInput;

