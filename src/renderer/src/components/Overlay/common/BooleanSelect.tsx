import { ChangeEvent, FC } from "react";

const BooleanSelect: FC<{ value: boolean, onChange: (e: boolean) => void }> = ({ value, onChange }) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value === "yes");
    }

    return (
        <select value={value ? "yes" : "no"} onChange={handleChange} >
            <option value="yes">Yes</option>
            <option value="no">No</option>
        </select>
    )
}

export default BooleanSelect;