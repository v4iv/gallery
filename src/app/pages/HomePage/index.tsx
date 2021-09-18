import React, {lazy, Suspense, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux"
import {isEmpty} from "lodash"
import {
    Box,
    Divider,
    Heading,
    Spinner,
} from "gestalt"
import {RootState} from "../../reducers"
import {FETCH_GALLERY_ERROR, FETCH_GALLERY_REQUEST, FETCH_GALLERY_SUCCESS} from "../../constants/gallery.constants";
import {fetchGalleryAction} from "../../actions/gallery.actions";
import SEO from "../../components/SEO"
// Lazy Load
const PhotoGrid = lazy(() => import("../../components/PhotoGrid"))
const ErrorToast = lazy(() => import("../../components/ErrorToast"))

const HomePage: React.FC = () => {
    const dispatch = useDispatch()

    const {photoList, page, error, loading} = useSelector(
        (state: RootState) => ({
            photoList: state.gallery.photoList,
            page: state.gallery.page,
            error: state.gallery.error,
            loading: state.gallery.loading,
        })
    )

    const handleFetch = useCallback(() => {
        dispatch({
            type: FETCH_GALLERY_REQUEST,
        })

        const url = `${process.env.REACT_APP_FLICKR_API_URL}flickr.photos.getRecent&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&page=${page}&format=json&nojsoncallback=1&extras=url_q,url_m,url_l,url_o`

        fetchGalleryAction(url)
            .then((res) => {
                dispatch({
                    type: FETCH_GALLERY_SUCCESS,
                    payload: res,
                })
            })
            .catch((err) => {
                console.error(FETCH_GALLERY_ERROR, err)
                dispatch({
                    type: FETCH_GALLERY_ERROR,
                    payload: "Oops! Something went wrong. Please try again later.",
                })
            })
    }, [dispatch, page])

    useEffect(() => {
        if (isEmpty(photoList)) {
            handleFetch()
        }
    }, [handleFetch]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <SEO
                title="Home"
                description="MindPeers Take Home Project"
                image={`${process.env.REACT_APP_URL}/logo192.png`}
                url={`${process.env.REACT_APP_URL}`}
            />

            <Box paddingY={1}>
                <Box
                    marginBottom={2}
                    display="flex"
                    justifyContent="between"
                    alignItems="center"
                >
                    <Heading size="md" align="center">Previous Searches...</Heading>
                </Box>

                <Divider/>

                {isEmpty(photoList) && loading && <Box paddingY={6}>
                    <Spinner accessibilityLabel="Loading..." show />
                </Box>}

                {!isEmpty(photoList) && (
                    <Suspense
                        fallback={
                            <Box paddingY={6}>
                                <Spinner accessibilityLabel="Loading..." show />
                            </Box>
                        }
                    >
                        <PhotoGrid
                            photoList={photoList}
                            loadItems={handleFetch}
                            loading={loading}
                        />
                    </Suspense>
                )}

                {error && !loading && (
                    <Suspense
                        fallback={
                            <Box paddingY={6}>
                                <Spinner accessibilityLabel="Loading..." show/>
                            </Box>
                        }
                    >
                        <ErrorToast message={error}/>
                    </Suspense>
                )}
            </Box>
        </>
    );
};

export default HomePage;
