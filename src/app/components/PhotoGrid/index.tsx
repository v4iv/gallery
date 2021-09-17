import React, { createRef } from 'react';
import { Box, Masonry, Spinner } from "gestalt"
import PhotoCard from "../PhotoCard";
import {Photo} from "../../types/gallery.types";

interface IProps {
    photoList: Photo[]
    loadItems: () => void
    loading: boolean
}


const PhotoGrid: React.FC<IProps> = (props) => {
    const { photoList, loadItems, loading } = props
    const scrollContainerRef = createRef<HTMLDivElement>()
    // @ts-ignore
    const measurementStore = Masonry.createMeasurementStore(photoList.length)

    return (
        <>
            <Box maxHeight="80vh" ref={scrollContainerRef} overflow="auto">
                <Masonry
                    minCols={3}
                    comp={({ data }) => <PhotoCard photo={data} />}
                    items={photoList}
                    loadItems={loadItems}
                    scrollContainer={() => scrollContainerRef.current!}
                    measurementStore={measurementStore}
                    flexible
                    virtualize
                />
                <Box paddingY={6}>
                    <Spinner accessibilityLabel="Loading..." show={loading} />
                </Box>
            </Box>
        </>
    );
};

export default PhotoGrid;
