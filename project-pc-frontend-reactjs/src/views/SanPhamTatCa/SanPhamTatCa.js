import React from "react";
import { withRouter } from "react-router-dom";

import ListSanPham from "../SanPham/ListSanPham";
import Nav2 from "../Nav/Nav2";
import Footer from "../Footer/Footer";

class SanPhamTatCa extends React.Component {


    render() {
        return (
            <>
                <Nav2 />
                <ListSanPham />
                <Footer />
            </>
        );
    }
}

export default withRouter(SanPhamTatCa);
