import React from 'react';
import {Avatar, Box, Card, Heading } from 'gestalt';
import {capitalize, get} from 'lodash'
import {Photo} from "../../types/gallery.types";

interface IProps {
    photo: Photo
}

const PhotoCard: React.FC<IProps> = (props) => {
    const {photo} = props

    const title = get(photo, ["title"], "Untitled") || ""
    const image = get(photo, ["url_q"])

    return (
        <Box margin={1} rounding={2} padding={2} borderStyle="sm">
            <Card image={<Avatar name={title} src={image}/>}>
                <Box paddingX={3} paddingY={2}>
                    <Heading size="md" align="center" truncate>
                        {capitalize(title)}
                    </Heading>
                </Box>
            </Card>
        </Box>
    );
};

export default PhotoCard;
