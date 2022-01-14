import React from "react";
import styled from "styled-components";
import {useState} from 'react'
import Text from "../../components/style/text.component";


// /* Links inside the dropdown */
// .dropdown-content a {
//     color: black;
//     padding: 12px 16px;
//     text-decoration: none;
//     display: block;
// }

/* Change color of dropdown links on hover */
//.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
// .dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
// .dropdown:hover .dropbtn {background-color: #3e8e41;}

const DropdownButton = styled.button`
  background-color: #04AA6D;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  width: 100%;`

const  DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }`

const DropdownWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  &:hover ${DropdownContent} {
    display: block;
  }
  &:hover ${DropdownButton} {
    background-color: #3e8e41;
  }`

interface DropdownParams {
    options: string[]
    onChange: (selectedOptions: string[]) => void
}



const Dropdown= (props: DropdownParams) => {
    const [openOptions, setOpenOptions] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<string[]>([])

    const removeOption = (id) => {
        setSelectedOptions(selectedOptions.filter((option) => selectedOptions.indexOf(option) !== id))
    }

    return (
        <DropdownWrapper>
            <DropdownButton onClick={() => setOpenOptions(!openOptions)}>
                {/*Dropdown*/}
                {selectedOptions.map((option, i) => (
                    <Text>
                        {option}
                        <span style={{color: 'red', cursor: 'pointer'}} onClick={() => removeOption(i)}>
                            X
                        </span>
                    </Text>
                ))}
            </DropdownButton>
            {openOptions && <DropdownContent>
                {props.options.filter(option => !selectedOptions.includes(option))
                    .map((value, i) =>
                        <a key={i} onClick={() => setSelectedOptions([...selectedOptions, value])}>{value}</a>)}
            </DropdownContent>}
        </DropdownWrapper>
    );
}

export default Dropdown
