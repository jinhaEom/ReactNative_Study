import Button from "../components/Button"
import Icon from "../components/Icon"
import React from "react"

export const HeaderIcon = (props) => {
    return(
        <Button onPress={props.onPress}>
            <Icon name={props.iconName} size={28} color='black'/>
        </Button>
    )
}