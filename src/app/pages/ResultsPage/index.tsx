import React, {lazy, Suspense, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {isEmpty} from "lodash";
import {FETCH_RESULTS_ERROR, FETCH_RESULTS_REQUEST, FETCH_RESULTS_SUCCESS} from "../../constants/results.constants";
import {fetchResultsAction} from "../../actions/results.actions";
import SEO from "../../components/SEO";
import {Box, Divider, Heading, Spinner} from "gestalt";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
// Lazy Load
const PhotoGrid = lazy(() => import("../../components/PhotoGrid"))
const ErrorToast = lazy(() => import("../../components/ErrorToast"))

const ResultsPage: React.FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const search = queryString.parse(location.search)

    const query = search.q || ''

    const {photoList, page, error, loading} = useSelector(
        (state: RootState) => ({
            photoList: state.results.photoList,
            page: state.results.page,
            error: state.results.error,
            loading: state.results.loading,
        })
    )

    const handleFetch = useCallback(() => {
        dispatch({
            type: FETCH_RESULTS_REQUEST,
        })

        const url = `${process.env.REACT_APP_FLICKR_API_URL}flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&page=${page}&format=json&nojsoncallback=1&text=${query}&extras=url_q,url_m,url_l,url_o`

        fetchResultsAction(url)
            .then((res) => {
                dispatch({
                    type: FETCH_RESULTS_SUCCESS,
                    payload: res,
                })
            })
            .catch((err) => {
                console.error(FETCH_RESULTS_ERROR, err)
                dispatch({
                    type: FETCH_RESULTS_ERROR,
                    payload: "Oops! Something went wrong. Please try again later.",
                })
            })
    }, [dispatch, page, query])

    useEffect(() => {
        if (isEmpty(photoList)) {
            handleFetch()
        }
    }, [handleFetch]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <SEO
                title="Search"
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

export default ResultsPage;
