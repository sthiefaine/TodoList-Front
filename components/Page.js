import Meta from './Meta';

import { withRedux } from "../redux/store/next-with-redux";

function Page({children}) {

    return (
        <>
            <Meta />
                {children}
        </>
    )
}

export default withRedux(Page);