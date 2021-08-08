import {Link} from 'react-router-dom'

const PageNotFound = () => {
    return ( 
        <div>
            <h1>Page Not Found</h1>
            <h3>Go to :</h3>
            <Link to="/">Home</Link>
        </div>
     );
}
 
export default PageNotFound;