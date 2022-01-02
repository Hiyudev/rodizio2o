import ExtensionDemo from '../../icons/ExtensionDemo';
import Button from '../../ui/Button';
import s from './product.module.css';

const Product = () => {
	return (
		<div className={s.page}>
			<div className={s.image}>
				<ExtensionDemo />
			</div>
			<div className={s.content}>
				<h2 className={s.title}>
					SAIBA SEMPRE QUANDO OCORRE AS PRÓXIMAS RESTRIÇÕES COM A EXTENSÃO
				</h2>
				<p>
					Basta colocar CEP e o número da residência e calcule para evitar
					qualquer imprevisto
				</p>
				<Button>Baixe extensão</Button>
			</div>
		</div>
	);
};

export default Product;
