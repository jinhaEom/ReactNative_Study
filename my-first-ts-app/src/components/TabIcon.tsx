import React from "react";
import Icon, { IconName } from "./Icon"
import { Badge } from "./Badge";

export const TabIcon: React.FC<{
    visibleBadge: boolean,
    iconName: IconName,
    iconColor: string,
}> = (props) => {
    if (props.visibleBadge) {
        return ( 
            <Badge>
                <Icon
                    name={props.iconName}
                    size={20}
                    color={props.iconColor}
                />
            </Badge>
        )
    }
    return (
        <Icon
            name={props.iconName}
            size={20}
            color={props.iconColor}
        />
    )
}