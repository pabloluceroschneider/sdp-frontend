export default function swDev() {
	let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
	if (navigator && navigator.serviceWorker && navigator.serviceWorker.register){
		navigator.serviceWorker.register(swUrl).then((response) => {
			console.warn('response', response);
		});
	}
}
