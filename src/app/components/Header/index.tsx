import React, {lazy, Suspense, useCallback, useContext, useRef, useState,} from 'react';
import {
    Box,
    CompositeZIndex,
    FixedZIndex,
    Icon,
    IconButton,
    Layer,
    Pog,
    Popover,
    SearchField,
    SearchFieldProps,
    Spinner,
    Tooltip,
} from "gestalt"
import ThemeContext from "../../contexts/ThemeContext"
import RouterLink from "../RouterLink"
import {githubSVGPath} from "../../../assets/images/svg";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers";
import {fetchGalleryAction} from "../../actions/gallery.actions";
import {debounce} from "lodash";
import {SEARCH_ERROR, SEARCH_REQUEST, SEARCH_SUCCESS} from "../../constants/search.constants";
// Lazy Load
const ResultFlyout = lazy(() => import("../ResultFlyout"))

const Header: React.FC = () => {
    const themeContext = useContext(ThemeContext)
    const dispatch = useDispatch()

    const anchorRef = useRef(null)

    const [query, setQuery] = useState("")

    const SEARCH_ZINDEX = new FixedZIndex(10)
    const resultsZIndex = new CompositeZIndex([SEARCH_ZINDEX])

    const {results, loading} = useSelector(
        (state: RootState) => ({
            results: state.search.results,
            loading: state.search.loading,
        })
    )

    const search = useCallback((value) => {
        dispatch({
            type: SEARCH_REQUEST,
        })

        const url = `${process.env.REACT_APP_FLICKR_API_URL}flickr.photos.search&api_key=${process.env.REACT_APP_FLICKR_API_KEY}&page=1&format=json&nojsoncallback=1&per_page=5&text=${value}&extras=url_sq,url_m`

        fetchGalleryAction(url)
            .then((res) => {
                dispatch({
                    type: SEARCH_SUCCESS,
                    payload: res,
                })
            })
            .catch((err) => {
                console.error(SEARCH_ERROR, err)
                dispatch({
                    type: SEARCH_ERROR,
                    payload: "Oops! Something went wrong. Please try again later.",
                })
            })
    }, [dispatch])

    const debouncedSearch = debounce(search, 500)

    const changeHandler: SearchFieldProps["onChange"] = useCallback(
        ({value}) => {
            setQuery(value)

            debouncedSearch(value)
        }, [debouncedSearch])

    return (
        <>
            <Box
                color="white"
                rounding={1}
                margin={1}
                padding={2}
                display="flex"
                alignItems="center"
                borderStyle="sm"
            >
                <Box padding={2}>
                    <RouterLink to="/" hoverStyle="none" accessibilityLabel="Home">
                        <Icon
                            icon="camera-roll"
                            color="watermelon"
                            size={32}
                            inline
                            accessibilityLabel="Pokedex"
                        />
                    </RouterLink>
                </Box>

                <Box flex="grow" paddingX={1} ref={anchorRef}>
                    <SearchField
                        accessibilityLabel="Search"
                        id="searchField"
                        autoComplete="off"
                        onChange={changeHandler}
                        placeholder="Search"
                        value={query}
                    />
                </Box>

                <Tooltip
                    inline
                    text={themeContext.theme === "light" ? "Dark Mode" : "Light Mode"}
                >
                    <Box paddingX={2} display="inlineBlock">
                        <IconButton
                            accessibilityLabel="toggle color scheme: light / dark mode views"
                            icon="workflow-status-in-progress"
                            size="md"
                            onClick={themeContext.toggleTheme}
                        />
                    </Box>
                </Tooltip>

                <Tooltip inline text="Github">
                    <Box paddingX={2} display="inlineBlock">
                        <RouterLink to="https://github.com/v4iv/gallery" target="blank">
                            <Pog
                                accessibilityLabel="Github"
                                dangerouslySetSvgPath={githubSVGPath}
                                size="md"
                            />
                        </RouterLink>
                    </Box>
                </Tooltip>
            </Box>

            {query.length && (
                <Layer zIndex={resultsZIndex}>
                    <Popover
                        anchor={anchorRef.current!}
                        idealDirection="down"
                        onDismiss={() => setQuery("")}
                        positionRelativeToAnchor={false}
                        size="md"
                        showCaret
                    >
                        <Suspense
                            fallback={
                                <Box padding={3} column={12}>
                                    <Spinner accessibilityLabel="Loading..." show />
                                </Box>
                            }
                        >
                            <ResultFlyout results={results} loading={loading} />
                        </Suspense>
                    </Popover>
                </Layer>
            )}
        </>
    );
};

export default Header;
