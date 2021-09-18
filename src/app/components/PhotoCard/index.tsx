import React, {useState} from 'react';
import {Avatar, Box, Card, Heading, CompositeZIndex, FixedZIndex, Layer, Modal, Image, Button} from 'gestalt';
import {capitalize, get} from 'lodash'
import {Photo} from "../../types/gallery.types";

interface IProps {
    photo: Photo
}

const PhotoCard: React.FC<IProps> = (props) => {
    const {photo} = props
    const [showModal, setShowModal] = useState(false);

    const HEADER_ZINDEX = new FixedZIndex(10);
    const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

    const title = get(photo, ["title"], "Untitled") || ""
    const icon = get(photo, ["url_q"])
    const image = get(photo, ["url_m"])
    const height = get(photo, ["height_m"])
    const width = get(photo, ["width_m"])

    return (
        <>
            <Box margin={1} rounding={2} padding={2} borderStyle="sm">
                <Card image={<Avatar name={title} src={icon}/>}>
                    <Box paddingX={3} paddingY={2}>
                        <Heading size="sm">
                            {capitalize(title)}
                        </Heading>
                    </Box>

                    <Button text="View" color="red" onClick={() => setShowModal(!showModal)} fullWidth/>
                </Card>
            </Box>

            {showModal &&  <Layer zIndex={zIndex}>
                <Modal accessibilityModalLabel={title}
                       heading={title}
                       onDismiss={() => setShowModal(!showModal)}>
                    <Box padding={8}>
                        <Image alt={title}
                            color="rgb(111, 91, 77)"
                            naturalHeight={height}
                            naturalWidth={width}
                            src={image}
                        />
                    </Box>
                </Modal>
            </Layer>}
        </>
    );
};

export default PhotoCard;
