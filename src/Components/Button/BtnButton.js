import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Button from 'react-bootstrap/Button';


export default (props) => {
    const {loading} = props;
    return <Button type="submit" disabled={loading}  variant="outline-primary" {...props}>
        {loading ? <ClipLoader
            size={20}
            color={"#123abc"}
            loading={true}
        /> : props.children}
    </Button>
}