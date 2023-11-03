import Header from '../components/Header';
function HeaderOnly({ children }) {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;
