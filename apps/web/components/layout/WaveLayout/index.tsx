import Wave from '../../icons/Wave';
import s from './wavelayout.module.css';

const WaveLayout = ({ children }) => {
	return (
		<div>
			<div className={s.wave}>
				<Wave />
			</div>
			<div className={s.section}>{children}</div>
		</div>
	);
};

export default WaveLayout;
