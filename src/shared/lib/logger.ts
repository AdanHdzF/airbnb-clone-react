import logLevel from 'loglevel';

export default class Logger {
	// static log(arg0: string, response: AxiosResponse<any, any>) {
	// 	throw new Error('Method not implemented.');
	// }

	private logger = logLevel.getLogger('Logger');
	private prefixMessage = '[' + new Date().toISOString() + ']: ';

	constructor() {
		this.logger.setLevel('debug');
	}

	log(message: string) {
		this.logger.debug(this.prefixMessage, message);
	}

	error(message: string) {
		this.logger.error(this.prefixMessage, message);
	}

	info(message: string) {
		this.logger.info(this.prefixMessage, message);
	}
}
