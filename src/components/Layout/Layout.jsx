import React, { useState } from 'react';
import './Layout.css';
import logo from '../../assets/img/logo.png';
import IconBtn from '../IconBtn/IconBtn';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {
    useHistory,
    } from 'react-router-dom'


const mapStateToProps = state => ({
    auth: state.auth,
    view: state.view
})

// const mapActionToProps = {
//     logout,
//     toggleNavbar,
//     getAllCategories,
//     getAllServices
// }


const FooterNav = ({
    text,
    icon,
    path,
    active
}) => {
    return <Link className={`ml-4 mr-4 text-center ${active ? 'text-theme' : 'text-accent'}`} to={path}>
        <i style={{ fontSize: '22px' }} className={icon}></i><br />
        <small>{text}</small>
    </Link>
};

const EachNav = ({
    text,
    path,
    icon
}) => {
    return <Link className='border-bottom1' to={path}>
        <span><i className={`${icon} mr-2`}></i></span>
        {text}
        <hr className='mb-1' />
    </Link>
}

export default connect(mapStateToProps)(({
    children,
    back
}) => {

    const [showNav, setShowNav] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    
    const router = useHistory()

    return (
        <>
            <nav className='fixed-top w-100 bd-navbar border-1 bg-white pl-4 pr-4 pt-2 pb-2 border'>
                <div className='row justify-content-between'>
                    {
                        back ? <IconBtn icon='ti-arrow-left' onClick={() => router.goBack()} />:
                            <IconBtn icon='ti-menu' onClick={() => { setShowNav(!showNav) }} />
                    }
                    <img width='140' height='30' className='mt-1' src={logo} alt='sheruta.ng' />
                    <IconBtn icon={`${showSearch ? 'ti-close' : 'ti-search'}`} onClick={() => { setShowSearch(!showSearch) }} />
                </div>
                <Search show={showSearch} />
            </nav>


            <aside>
                <div id="mySidenav" className="sidenav" style={{ width: showNav ? '300px' : '0px', zIndex: 2 }}>
                    <a href="#navigator" className="closebtn" onClick={() => { setShowNav(false) }}>&times;</a>
                    <hr />
                    <EachNav icon='ti-home' text='Home' path='/' />
                    <EachNav icon='ti-comment' text='Requests' path='/reqeusts' />
                    <EachNav icon='ti-briefcase' text='About Us' path='/about' />
                    <EachNav icon='ti-mobile' text='Contact Us' path='/contact' />
                </div>

            </aside>


            <div className='pt-5 mt-2'>
                {children}
            </div>


            <nav className='fixed-bottom bg-white border' style={{ zIndex: 2 }}>
                <div className='row justify-content-center mt-1'>
                    <FooterNav
                        icon='ti-home'
                        text='Home'
                        path='/'
                        active={true}
                    />
                    <FooterNav
                        icon='ti-search'
                        text='Search'
                        path='/search'
                    />
                    <FooterNav
                        icon='ti-user'
                        text='Login'
                        path='/login'
                    />
                </div>
            </nav>
        </>
    )
});
