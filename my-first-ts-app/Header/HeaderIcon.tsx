import Icon from "../src/components/Icon"
import React from 'react';
import { IconName } from "../src/components/Icon";
import Button from "../src/components/Button";

export const HeaderIcon: React.FC<{
    onPress: () => void,
    iconName: IconName
}> = (props) => {
    return(
        <Button onPress={props.onPress}>
            <Icon name={props.iconName} size={28} color='black'/>
        </Button>
    )
}