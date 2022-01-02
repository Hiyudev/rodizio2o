import s from './layout.module.css';

const Layout = ({ children }) => {
	return <div className={s.layout}>{children}</div>;
};

export default Layout;
