import React, {useEffect} from "react";
import { Link, useLocation } from 'react-router-dom';
import "../../styleCss/Topbar.css";
import { useRecoilState } from 'recoil';
import { pageState } from '../../atoms/atom';


function Topbar_bottom(){
    const [page, setPage] = useRecoilState(pageState);

    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;

        if (path === '/categori') {
            setPage(0);
        } else if (path === '/bucket') {
            setPage(1);
        } else if (path === '/buylist') {
            setPage(2);
        }
    }, [location]);

    return (
        <div className="notFix">
            <Link to="/categori">
                <div><span className={page === 0 ? "clicked" : ""}>상품 목록</span></div>
            </Link>
            <Link to="/bucket">
                <div><span className={page === 1 ? "clicked" : ""}>장바구니</span></div>
            </Link>
            <Link to="/buylist">
                <div><span className={page === 2 ? "clicked" : ""}>내 구매 내역</span></div>
            </Link>
        </div>
    );
}

export default Topbar_bottom;