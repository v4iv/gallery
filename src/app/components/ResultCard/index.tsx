import React, {useState} from 'react';
import {PhotoResult} from "../../types/search.types";
import {Avatar, Box, Button, CompositeZIndex, FixedZIndex, Image, Layer, Modal, Text} from "gestalt";
import {capitalize, get} from "lodash";

interface IProps {
    photo: PhotoResult
}

const ResultCard: React.FC<IProps> = (props) => {
    const {photo} = props
    const [showModal, setShowModal] = useState(false);

    const HEADER_ZINDEX = new FixedZIndex(15);
    const zIndex = new CompositeZIndex([HEADER_ZINDEX]);

    const title = get(photo, ["title"], "Untitled") || ""
    const icon = get(photo, ["url_sq"])
    const image = get(photo, ["url_m"])
    const height = get(photo, ["height_m"])
    const width = get(photo, ["width_m"])

    return (
        <>
            <Box
                borderStyle="sm"
                rounding={2}
                margin={1}
                flex="grow"
            >
                <Box padding={2} alignItems="center" display="flex">
                    <Box paddingX={2}>
                        <Avatar
                            name={title}
                            src={icon}
                            size="xs"
                        />
                    </Box>
                    <Box paddingX={2} flex="grow">
                        <Text color="darkGray" weight="bold" lineClamp={1}>
                            {capitalize(title)}
                        </Text>
                    </Box>
                    <Box paddingX={2}>
                        <Button text="View" color="red" onClick={() => setShowModal(!showModal)} fullWidth/>
                    </Box>
                </Box>
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

export default ResultCard;
