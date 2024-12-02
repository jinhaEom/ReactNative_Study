import { Badge } from "./Badge"
import Icon from "./Icon"

export const TabIcon = (props) => {
    if (props.visibleBadge) {
        return ( 
            <Badge fontSize={10}>
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