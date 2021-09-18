import React, {lazy, Suspense, useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {isEmpty, uniq, slice} from "lodash";
import {FETCH_RESULTS_ERROR, FETCH_RESULTS_REQUEST, FETCH_RESULTS_SUCCESS} from "../../constants/results.constants";
import {fetchResultsAction} from "../../actions/results.actions";
import SEO from "../../components/SEO";
import {Box, Divider, Spinner} from "gestalt";
import {useLocation} from "react-router-dom";
import queryString from "query-string";
import RecentSearches from "../../components/RecentSearches";
// Lazy Load
const PhotoGrid = lazy(() => import("../../components/PhotoGrid"))
const ErrorToast = lazy(() => import("../../components/ErrorToast"))

const ResultsPage: React.FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const search = queryString.parse(location.search)

    const query = search.q || ''

    useEffect(() => {
        if (localStorage && localStorage.getItem("recentSearches")) {
            const storedString = localStorage.getItem("recentSearches")

            if (storedString != null) {
                let storedSearches = JSON.parse(storedString)

                // @ts-ignore
                storedSearches.push(query)

                const recentSearches = JSON.stringify(slice(uniq(storedSearches), 0, 4))

                localStorage.setItem("recentSearches", recentSearches)
            }
        } else {
            let recentSearches = []

            recentSearches.push(query)

            localStorage.setItem("recentSearches", JSON.stringify(recentSearches))
        }
    }, [query])

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
                <RecentSearches/>

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
