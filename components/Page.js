import Meta from './Meta';

function Page({children}) {

    return (
        <>
            <Meta />

            
                {children}
           
        </>
    )
}

export default Page;