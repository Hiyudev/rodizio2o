import ChromeIcon from "../../icons/Chrome";
import DownloadIcon from "../../icons/Download";
import LinuxIcon from "../../icons/Linux";
import MacIcon from "../../icons/Mac";
import WindowsIcon from "../../icons/Windows";
import s from "./download.module.css";

function DownloadSection() {
	return (
		<div className={s.downloadsection}>
			<ul className={s.downloadlist}>
				<li className={"group " + s.item}>
					<div className={s.item_icon}>
						<div className="block group-hover:hidden">
							<ChromeIcon />
						</div>
						<div className="hidden group-hover:block">
							<button className="h-6">
								<DownloadIcon />
							</button>
						</div>
					</div>
					<p className={s.item_title}>Instale o aplicativo</p>
				</li>
				<li className={"group " + s.item}>
					<div className={s.item_icon}>
						<div className="block group-hover:hidden">
							<ChromeIcon />
						</div>
						<div className="hidden group-hover:block">
							<button className="h-6">
								<DownloadIcon />
							</button>
						</div>
					</div>
					<p className={s.item_title}>Instale a extensão para seu navegador</p>
				</li>
				<li className={"group " + s.item}>
					<div className={s.item_icon}>
						<div className="block group-hover:hidden">
							<WindowsIcon />
						</div>
						<div className="hidden group-hover:block">
							<button className="h-6">
								<DownloadIcon />
							</button>
						</div>
					</div>
					<p className={s.item_title}>Instale para seu computador windows</p>
				</li>
				<li className={"group " + s.item}>
					<div className={s.item_icon}>
						<div className="block group-hover:hidden">
							<MacIcon />
						</div>
						<div className="hidden group-hover:block">
							<button className="h-6">
								<DownloadIcon />
							</button>
						</div>
					</div>
					<p className={s.item_title}>Instale para seu computador mac</p>
				</li>
				<li className={"group " + s.item}>
					<div className={s.item_icon}>
						<div className="block group-hover:hidden">
							<LinuxIcon />
						</div>
						<div className="hidden group-hover:block">
							<button className="h-6">
								<DownloadIcon />
							</button>
						</div>
					</div>
					<p className={s.item_title}>Instale para seu computador linux</p>
				</li>
			</ul>
		</div>
	);
}

export default DownloadSection;
